import { z } from "zod";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import Book from "../models/book.model.js";

export class BookController {
  constructor(bookService, reviewService) {
    this.bookService = bookService;
    this.reviewService = reviewService;
  }

  getBooks = async (req, res, next) => {
    const books = await this.bookService.getBooks();
    res.json({
      success: true,
      message: "Successfully retrieved books",
      data: books,
    });
  };

  getBookById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const stringIsNumberSchema = z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "The string must be a valid number.",
        });

      const validatedId = stringIsNumberSchema.safeParse(id);

      let numId = null;
      if (!validatedId.success) {
        throw new BadRequestException("Invalid book ID");
      } else {
        numId = Number(validatedId.data);
      }

      const book = await this.bookService.getBookById(numId);
      res.json({
        success: true,
        message: "Successfully retrieved book",
        data: book,
      });
    } catch (err) {
      next(err);
    }
  };

  createBook = async (req, res, next) => {
    try {
      // Define Zod schema for book data validation
      const bookSchema = z.object({
        title: z
          .string()
          .min(1, "Title is required")
          .max(255, "Title is too long"),
        author: z
          .string()
          .min(1, "Author is required")
          .max(255, "Author is too long"),
        published_date: z
          .string()
          .optional()
          .refine(
            (date) => {
              // e.g. 2021-01-01
              if (!date) return true; // Allow null/undefined for optional field
              return !isNaN(Date.parse(date)); // Validate if it's a valid date
            },
            { message: "Invalid date format" }
          ),
      });

      console.log(req.body);
      // Parse and validate request body
      const validatedBook = bookSchema.parse(req.body);

      // Pass validated data to the service
      const createdBook = await this.bookService.createBook(validatedBook);

      // Return a success response
      res.status(201).json({
        success: true,
        message: "Successfully created book",
        data: createdBook,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        next(
          new BadRequestException(err.errors.map((e) => e.message).join(", "))
        );
      } else {
        // Handle other errors
        next(err);
      }
    }
  };

  updateBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate that `id` is a valid number
      const stringIsNumberSchema = z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "The string must be a valid number.",
        });

      const validatedId = stringIsNumberSchema.safeParse(id);

      if (!validatedId.success) {
        throw new BadRequestException("Invalid book ID");
      }

      await this.bookService.updateBook(id, updateData);

      res.json({
        success: true,
        message: "Successfully updated the book",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteBook = async (req, res, next) => {
    try {
      const { id } = req.params; // Get the book ID from the URL

      // Validate that `id` is a valid number
      const stringIsNumberSchema = z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "The string must be a valid number.",
        });

      const validatedId = stringIsNumberSchema.safeParse(id);

      if (!validatedId.success) {
        throw new BadRequestException("Invalid book ID");
      }

      await this.bookService.deleteBook(id);

      res.json({
        success: true,
        message: "Successfully deleted the book",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };

  createReview = async (req, res, next) => {
    try {
      const bookId = req.params.id;

      // Validate that `bookId` is a valid number
      const stringIsNumberSchema = z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "The string must be a valid number.",
        });

      const validatedBookId = stringIsNumberSchema.safeParse(bookId);

      if (!validatedBookId.success) {
        throw new BadRequestException("Invalid book ID");
      }

      // Define Zod schema for review data validation
      const reviewSchema = z.object({
        review: z.string().min(1, "Review content is required"),
        rating: z
          .number()
          .int()
          .min(1, "Rating must be at least 1")
          .max(5, "Rating cannot exceed 5"),
      });

      const validatedReview = reviewSchema.parse(req.body);

      // Pass validated data to the service
      const createdReview = await this.reviewService.createReview(
        validatedBookId.data,
        validatedReview
      );

      res.status(201).json({
        success: true,
        message: "Successfully created review",
        data: createdReview,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        next(
          new BadRequestException(err.errors.map((e) => e.message).join(", "))
        );
      } else {
        next(err);
      }
    }
  };

  deleteReview = async (req, res, next) => {
    try {
      const { id } = req.params; // Get the review ID from the URL

      // Validate that `id` is a valid number
      const stringIsNumberSchema = z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "The string must be a valid number.",
        });

      const validatedId = stringIsNumberSchema.safeParse(id);

      if (!validatedId.success) {
        throw new BadRequestException("Invalid review ID");
      }

      // Delete the review
      await this.reviewService.deleteReview(validatedId.data);

      res.json({
        success: true,
        message: "Successfully deleted the review",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };
}

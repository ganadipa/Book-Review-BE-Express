import { z } from "zod";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { BookService } from "../services/book.service.js";
import { ReviewService } from "../services/review.service.js";

/**
 * Documentation for the file book.controller
 */
export class BookController {
  // Define controller methods

  // Get all books
  static getBooks = async (req, res, next) => {
    // Here, the service is expected to return a list of books
    const books = await BookService.getBooks();

    // Return the list of books as a JSON response
    res.json({
      success: true,
      message: "Successfully retrieved books",
      data: books,
    });
  };

  // Get a book by ID
  static getBookById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await BookService.getBookById(id);
      res.json({
        success: true,
        message: "Successfully retrieved book",
        data: book,
      });
    } catch (err) {
      next(err);
    }
  };

  // Create a new book
  static createBook = async (req, res, next) => {
    try {
      const createdBook = await BookService.createBook(req.body);

      // Return a success response
      res.status(201).json({
        success: true,
        message: "Successfully created book",
        data: createdBook,
      });
    } catch (err) {
      next(err);
    }
  };

  // Update a book
  static updateBook = async (req, res, next) => {
    try {
      await BookService.updateBook(req.params.id, req.body);

      res.json({
        success: true,
        message: "Successfully updated the book",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };

  // Delete a book
  static deleteBook = async (req, res, next) => {
    try {
      await BookService.deleteBook(req.params.id);

      res.json({
        success: true,
        message: "Successfully deleted the book",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };

  // Create a review for a book
  static createReview = async (req, res, next) => {
    try {
      const createdReview = await ReviewService.createReview({
        book_id: req.params.id,
        ...req.body,
      });

      res.status(201).json({
        success: true,
        message: "Successfully created review",
        data: createdReview,
      });
    } catch (err) {
      next(err);
    }
  };

  // Delete a review using the review ID
  static deleteReview = async (req, res, next) => {
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
      await ReviewService.deleteReview(validatedId.data);

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

import express from "express";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { BookController } from "../controllers/book.controller.js";

const router = express.Router();

// Book routes
// GET /books - Get all books
router.get("/books", BookController.getBooks);
{
  // GET /books/:id - Get a book by ID
  router.get("/books/:id", BookController.getBookById);

  // POST /books - Create a new book
  router.post("/books", BookController.createBook);

  // PUT /books/:id - Update a book by ID
  router.put("/books/:id", BookController.updateBook);

  // DELETE /books/:id - Delete a book by ID
  router.delete("/books/:id", BookController.deleteBook);

  // POST /books/:id/reviews - Create a review for a book
  router.post("/books/:id/reviews", BookController.createReview);
}

// DELETE /reviews/:id - Delete a review by ID
router.delete("/reviews/:id", BookController.deleteReview);

export default router;

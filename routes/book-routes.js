import express from "express";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { bookController } from "../config/ioc.js";

const router = express.Router();

// Book routes
// GET /books - Get all books
router.get("/books", bookController.getBooks);
{
  // GET /books/:id - Get a book by ID
  router.get("/books/:id", bookController.getBookById);

  // POST /books - Create a new book
  router.post("/books", bookController.createBook);

  // PUT /books/:id - Update a book by ID
  router.put("/books/:id", bookController.updateBook);

  // DELETE /books/:id - Delete a book by ID
  router.delete("/books/:id", bookController.deleteBook);

  // POST /books/:id/reviews - Create a review for a book
  router.post("/books/:id/reviews", bookController.createReview);
}

// DELETE /reviews/:id - Delete a review by ID
router.delete("/reviews/:id", bookController.deleteReview);

export default router;

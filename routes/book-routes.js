import express from "express";
import { BookController } from "../controllers/book.controller.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { BookRepository } from "../repositories/book.repository.js";
import { BookService } from "../services/book.service.js";
import database from "../config/db.js";
import { bookController } from "../config/config.js";

const router = express.Router();

// Book routes
router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.createBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);
router.post("/books/:id/reviews", bookController.createReview);
router.delete("/reviews/:id", bookController.deleteReview);

// Testing error routes
router.get("/bad-request", (req, res) => {
  throw new BadRequestException("Invalid input!");
});

router.get("/server-error", (req, res) => {
  throw new InternalServerErrorException("Unexpected issue occurred!");
});

export default router;

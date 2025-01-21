import express from "express";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { bookController } from "../config/ioc.js";

const router = express.Router();

// Book routes
router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.createBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);
router.post("/books/:id/reviews", bookController.createReview);
router.delete("/reviews/:id", bookController.deleteReview);

export default router;

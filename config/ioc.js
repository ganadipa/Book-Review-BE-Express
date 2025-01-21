import { BookController } from "../controllers/book.controller.js";
import { BookRepository } from "../repositories/book.repository.js";
import { BookService } from "../services/book.service.js";
import { ReviewService } from "../services/review.service.js";
import database from "./db.js";

export const sequelize = database.getSequelize();
export const bookRepository = new BookRepository(sequelize);
export const bookService = new BookService(bookRepository);
export const reviewService = new ReviewService(bookRepository);

export const bookController = new BookController(bookService, reviewService);

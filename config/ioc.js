import { BookController } from "../controllers/book.controller.js";
import { BookRepository } from "../repositories/book.repository.js";
import { ReviewRepository } from "../repositories/review.repository.js";
import { BookService } from "../services/book.service.js";
import { ReviewService } from "../services/review.service.js";
import database from "./db.js";

/**
 * Documentation for the file ioc container
 *
 * @Objective - This file is the Inversion of Control (IoC) container for the application.
 * It is responsible for creating instances of the classes and injecting the dependencies.
 * It is used to manage the dependencies between classes and their instances.
 *
 * @Pattern - Dependency Injection & Dependency Inversion
 *
 * @Example When we need a service but the service is not there yet, we can create a mock service and inject it into the class.
 *
 */

export const sequelize = database.getSequelize();

export const bookRepository = new BookRepository(sequelize);
export const reviewRepository = new ReviewRepository(sequelize);

export const bookService = new BookService(bookRepository);
export const reviewService = new ReviewService(
  bookRepository,
  reviewRepository
);

export const bookController = new BookController(bookService, reviewService);

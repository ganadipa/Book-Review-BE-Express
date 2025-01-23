import { BookRepository } from "../repositories/book.repository.js";
import ZodValidator from "../validations/ZodValidator.js";
import { BookSchema } from "../validations/zod-schema/book.schema.js";
import { StringSchema } from "../validations/zod-schema/common/string-schema.js";

/**
 * @Service
 * @class BookService
 *
 * This class will contain all the business logic for the book resource.
 * It will interact with the BookRepository to perform CRUD operations.
 */
export class BookService {
  // Get all books
  // returns a list of all books
  static async getBooks() {
    return await BookRepository.getAllBooks();
  }

  // Get a book by ID
  // returns a book with the specified ID and its reviews
  static async getBookById(id) {
    const numId = ZodValidator.validate(StringSchema.IS_NUMBER, id);
    const theBook = await BookRepository.getBookById(numId);
    return theBook;
  }

  // Create a new book
  // returns the newly created book
  static async createBook(expectingBook) {
    const book = ZodValidator.validate(BookSchema.CREATE, expectingBook);
    const newBook = await BookRepository.createBook(book);
    return newBook;
  }

  // Update a book by ID
  // returns the number of affected rows
  static async updateBook(expectingId, expectingPartialBook) {
    const id = ZodValidator.validate(StringSchema.IS_NUMBER, expectingId);
    const book = ZodValidator.validate(
      BookSchema.PARTIAL_UPDATE,
      expectingPartialBook
    );

    const updatedBook = await BookRepository.updateBook(id, book);
    return updatedBook;
  }

  // Delete a book by ID
  // returns the number of affected rows
  static async deleteBook(expectingId) {
    const id = ZodValidator.validate(StringSchema.IS_NUMBER, expectingId);
    const deletedBook = await BookRepository.deleteBook(id);

    return deletedBook;
  }
}

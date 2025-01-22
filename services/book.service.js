import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";

/**
 * @Service
 * @class BookService
 *
 * This class will contain all the business logic for the book resource.
 * It will interact with the BookRepository to perform CRUD operations.
 */
export class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  // Get all books
  // returns a list of all books
  async getBooks() {
    try {
      return await this.bookRepository.getAllBooks();
    } catch (error) {
      throw new InternalServerErrorException("Database error occurred");
    }
  }

  // Get a book by ID
  // returns a book with the specified ID and its reviews
  async getBookById(id) {
    const theBook = await this.bookRepository.getBookById(id);

    if (!theBook) {
      throw new NotFoundException("Book not found");
    }

    return theBook;
  }

  // Create a new book
  // returns the newly created book
  async createBook(book) {
    const newBook = await this.bookRepository.createBook(book);
    if (!newBook) {
      throw new InternalServerErrorException("Could not create book");
    }

    return newBook;
  }

  // Update a book by ID
  // returns the number of affected rows
  async updateBook(id, book) {
    const updatedBook = await this.bookRepository.updateBook(id, book);
    if (!updatedBook) {
      throw new NotFoundException("Book not found");
    }

    return updatedBook;
  }

  // Delete a book by ID
  // returns the number of affected rows
  async deleteBook(id) {
    const deletedBook = await this.bookRepository.deleteBook(id);
    console.log(deletedBook);
    if (!deletedBook) {
      throw new NotFoundException("Book not found");
    }

    return deletedBook;
  }
}

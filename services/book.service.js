import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";

export class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async getBooks() {
    try {
      return await this.bookRepository.getAllBooks();
    } catch (error) {
      throw new InternalServerErrorException("Database error occurred");
    }
  }

  async getBookById(id) {
    const theBook = await this.bookRepository.getBookById(id);

    if (!theBook) {
      throw new NotFoundException("Book not found");
    }

    return theBook;
  }

  async createBook(book) {
    const newBook = await this.bookRepository.createBook(book);
    if (!newBook) {
      throw new InternalServerErrorException("Could not create book");
    }

    return newBook;
  }

  async updateBook(id, book) {
    const updatedBook = await this.bookRepository.updateBook(id, book);
    if (!updatedBook) {
      throw new NotFoundException("Book not found");
    }

    return updatedBook;
  }

  async deleteBook(id) {
    const deletedBook = await this.bookRepository.deleteBook(id);
    if (!deletedBook) {
      throw new NotFoundException("Book not found");
    }

    return deletedBook;
  }
}

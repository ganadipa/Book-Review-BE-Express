import { NotFoundException } from "../exceptions/not-found.exception.js";
import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

// BookRepository class with methods to interact with the Book model
export class BookRepository {
  // Method to get all books
  // returns a list of all books
  static async getAllBooks() {
    return await Book.findAll();
  }

  // Method to get a book by ID
  // returns a book with the specified ID and its reviews
  static async getBookById(id) {
    const theBook = await Book.findByPk(id, {
      include: [
        {
          model: Review,
          as: "reviews",
        },
      ],
    });

    if (!theBook) {
      throw new NotFoundException("Book not found");
    }

    return theBook;
  }

  // Method to create a new book
  // returns the newly created book
  static async createBook(book) {
    return await Book.create(book);
  }

  // Method to update a book by ID
  // returns the number of affected rows
  static async updateBook(id, book) {
    const [affected] = await Book.update(book, {
      where: {
        id: id,
      },
    });

    if (affected === 0) {
      throw new NotFoundException("Book not found");
    }

    return affected;
  }

  // Method to delete a book by ID
  // returns the number of affected rows
  static async deleteBook(id) {
    const affected = await Book.destroy({
      where: {
        id: id,
      },
    });

    if (affected === 0) {
      throw new NotFoundException("Book not found");
    }

    return affected;
  }
}

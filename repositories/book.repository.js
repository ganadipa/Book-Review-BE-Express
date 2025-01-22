import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

// BookRepository class with methods to interact with the Book model
export class BookRepository {
  constructor(sqlize) {
    this.sequelize = sqlize;
  }

  // Method to get all books
  // returns a list of all books
  async getAllBooks() {
    return await Book.findAll();
  }

  // Method to get a book by ID
  // returns a book with the specified ID and its reviews
  async getBookById(id) {
    return await Book.findByPk(id, {
      include: [
        {
          model: Review,
          as: "reviews",
        },
      ],
    });
  }

  // Method to create a new book
  // returns the newly created book
  async createBook(book) {
    return await Book.create(book);
  }

  // Method to update a book by ID
  // returns the number of affected rows
  async updateBook(id, book) {
    const [affected] = await Book.update(book, {
      where: {
        id: id,
      },
    });
    return affected;
  }

  // Method to delete a book by ID
  // returns the number of affected rows
  async deleteBook(id) {
    return await Book.destroy({
      where: {
        id: id,
      },
    });
  }
}

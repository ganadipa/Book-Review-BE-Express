import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

export class BookRepository {
  constructor(sqlize) {
    this.sequelize = sqlize;
  }

  async getAllBooks() {
    return await Book.findAll();
  }

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

  async createBook(book) {
    return await Book.create(book);
  }

  async updateBook(id, book) {
    return await Book.update(book, {
      where: {
        id: id,
      },
    });
  }

  async deleteBook(id) {
    return await Book.destroy({
      where: {
        id: id,
      },
    });
  }
}

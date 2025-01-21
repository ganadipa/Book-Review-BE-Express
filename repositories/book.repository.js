import Book from "../models/book.model.js";

export class BookRepository {
  constructor(sqlize) {
    this.sequelize = sqlize;
  }

  async getAllBooks() {
    console.log(this.sequelize.models);
    return await Book.findAll();
  }
}

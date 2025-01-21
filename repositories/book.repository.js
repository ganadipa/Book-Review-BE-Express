export class BookRepository {
  constructor(sqlize) {
    this.sequelize = sqlize;
  }

  async getAllBooks() {
    console.log(this.sequelize.models);
    return await this.sequelize.models.Book.findAll();
  }
}

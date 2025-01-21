export class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async getBooks() {
    return await this.bookRepository.getAllBooks();
  }

  async getBookById(id) {
    return await this.bookRepository.getBookById(id);
  }
}

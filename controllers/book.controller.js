export class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }

  getBooks = (req, res, next) => {
    const books = this.bookService.getBooks();
    res.json({
      success: true,
      message: "Successfully retrieved books",
      data: books,
    });
  };

  getBookById = (req, res, next) => {
    res.send(`Get book with id ${req.params.id}`);
  };

  createBook = (req, res, next) => {
    res.send("Create a new book");
  };

  updateBook = (req, res, next) => {
    res.send("Update a book partially");
  };

  deleteBook = (req, res, next) => {
    res.send("Delete this specific book.");
  };

  createReview = (req, res, next) => {
    res.send("Create a review for this book");
  };

  deleteReview = (req, res, next) => {
    res.send("Delete this review");
  };
}

import "./config/env.js";
import express from "express";
import { BookController } from "./controllers/book.controller.js";

import database from "./config/db.js";

const app = express();

const port = 8080;

(async () => {
  await database.authenticate();
})();

const bookController = new BookController();

// Get all books
app.get("/books", bookController.getBooks);
{
  // Get book by id
  app.get("/books/:id", bookController.getBookById);

  // Create a book
  app.post("/books", bookController.createBook);

  //
  app.put("/books/:id", bookController.updateBook);

  app.delete("/books/:id", bookController.deleteBook);

  app.post("/books/:id/reviews", bookController.createReview);
}

app.delete("/reviews/:id", bookController.deleteReview);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

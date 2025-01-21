import path from "path";
import express from "express";
import { BookController } from "./controllers/book-controller.js";

const app = express();

const port = 8080;

const bookController = new BookController();

app.get("/books", bookController.getBooks);

app.get("/books/:id", bookController.getBookById);

app.post("/books", bookController.createBook);

app.put("/books/:id", bookController.updateBook);

app.delete("/books/:id", bookController.deleteBook);

app.post("/books/:id/reviews", bookController.createReview);

app.delete("/reviews/:id", bookController.deleteReview);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import "./config/env.js";
import express from "express";

import database from "./config/db.js";
import { errorHandler } from "./middlewares/error-handler.js";
import bookRouter from "./routes/book-routes.js";
import bodyParser from "body-parser";

const app = express();

const port = 8080;

(async () => {
  await database.authenticate();
})();

app.use(bodyParser.json());

app.use(bookRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

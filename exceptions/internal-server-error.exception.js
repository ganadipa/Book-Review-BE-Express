import { HttpException } from "./http-exception.js";

/**
 * @Throwable
 * @class InternalServerErrorException
 *
 * Will be thrown when an internal server error occurs.
 * Automatically sets the status code to 500.
 */
export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

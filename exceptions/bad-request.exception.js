import { HttpException } from "./http-exception.js";

/**
 * @Throwable
 * @class BadRequestException
 *
 * Will be thrown when the request is invalid or malformed.
 * Automatically sets the status code to 400.
 * And the message in the response JSON will be the message passed to the constructor.
 */
export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

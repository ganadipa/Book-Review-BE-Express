import { HttpException } from "./http-exception.js";

/**
 * @Throwable
 * @class NotFoundException
 *
 * Will be thrown when the requested resource is not found.
 * Automatically sets the status code to 404.
 */
export class NotFoundException extends HttpException {
  constructor(message = "Not found") {
    super(404, message);
  }
}

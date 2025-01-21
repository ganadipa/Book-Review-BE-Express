import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";

export class ReviewService {
  constructor(bookRepository, reviewRepository) {
    this.bookRepository = bookRepository;
    this.reviewRepository = reviewRepository;
  }

  async createReview(bookId, review) {
    const book = await this.bookRepository.getBookById(bookId);
    if (!book) {
      throw new NotFoundException("Book not found");
    }

    const newReview = await book.createReview({
      book_id: bookId,
      ...review,
    });
    if (!newReview) {
      throw new InternalServerErrorException("Could not create review");
    }

    return newReview;
  }

  async deleteReview(reviewId) {
    const deletedReview = await this.reviewRepository.deleteReview(reviewId);
    if (!deletedReview) {
      throw new InternalServerErrorException("Could not delete review");
    }

    return deletedReview;
  }
}

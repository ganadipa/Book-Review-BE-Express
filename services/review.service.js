import { InternalServerErrorException } from "../exceptions/internal-server-error.exception.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";

export class ReviewService {
  constructor(bookRepository, reviewRepository) {
    this.bookRepository = bookRepository;
    this.reviewRepository = reviewRepository;
  }

  // Create a review for a book
  // returns the newly created review
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

  // Delete a review by ID
  // returns the number of affected rows
  async deleteReview(reviewId) {
    const deletedReview = await this.reviewRepository.deleteReview(reviewId);
    if (!deletedReview) {
      throw new InternalServerErrorException("Could not delete review");
    }

    return deletedReview;
  }
}

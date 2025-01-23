import { NotFoundException } from "../exceptions/not-found.exception.js";
import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

export class ReviewRepository {
  // Method to get all reviews
  // returns the number of affected rows
  static async deleteReview(reviewId) {
    const affected = await Review.destroy({
      where: {
        id: reviewId,
      },
    });

    if (affected === 0) {
      throw new NotFoundException("Review not found");
    }

    return affected;
  }

  // Method to create a new review
  // returns the newly created review
  static async createReview(review) {
    // Check if the book exists before creating the review
    const bookExists = await Book.findByPk(review.book_id);

    if (!bookExists) {
      throw new NotFoundException("Book not found");
    }

    // Proceed to create the review
    return await Review.create(review);
  }
}

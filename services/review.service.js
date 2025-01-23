import { ReviewRepository } from "../repositories/review.repository.js";
import ZodValidator from "../validations/ZodValidator.js";
import { StringSchema } from "../validations/zod-schema/common/string-schema.js";
import { ReviewSchema } from "../validations/zod-schema/review.schema.js";

export class ReviewService {
  // Create a review for a book
  // returns the newly created review
  static async createReview(expectingReview) {
    const review = ZodValidator.validate(ReviewSchema.CREATE, expectingReview);
    const newReview = await ReviewRepository.createReview(review);
    return newReview;
  }

  // Delete a review by ID
  // returns the number of affected rows
  static async deleteReview(expectingReviewId) {
    const reviewId = ZodValidator.validate(
      StringSchema.IS_NUMBER,
      expectingReviewId
    );
    return await ReviewRepository.deleteReview(reviewId);
  }
}

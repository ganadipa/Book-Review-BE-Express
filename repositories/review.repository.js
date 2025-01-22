import Review from "../models/review.model.js";

export class ReviewRepository {
  constructor(sqlize) {
    this.sequelize = sqlize;
  }

  // Method to get all reviews
  // returns the number of affected rows
  async deleteReview(reviewId) {
    return await Review.destroy({
      where: {
        id: reviewId,
      },
    });
  }
}

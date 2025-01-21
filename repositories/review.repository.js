import Review from "../models/review.model.js";

export class ReviewRepository {
  constructor(sqlize) {
    this.sequelize = sqlize;
  }

  async deleteReview(reviewId) {
    return await Review.destroy({
      where: {
        id: reviewId,
      },
    });
  }
}

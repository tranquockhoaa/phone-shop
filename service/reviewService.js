const Review = require('./../models/review');

class ReviewService {
  static async createReview(data) {
    if (data.comment || data.rate) {
      const newReview = await Review.create({
        ...data
      });
      return newReview;
    }
    return 'please write somthing';
  }

  static async updateReview(id, data) {
    const review = await Review.findByPk(id);
    console.log('update running');
    await review.update({
      comment: data.comment,
      rate: data.rate,
    });
    return review;
  }

  static async getAllReview() {
    const allReview = await Review.findAll();
    return allReview;
  }

  static async getReviewById(id) {
    const review = await Review.findByPk(id);
    return review;
  }
}

module.exports = ReviewService;

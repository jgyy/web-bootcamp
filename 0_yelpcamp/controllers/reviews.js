import Review from "../models/review.js";
import Campground from "../models/campground.js";

const reviews = {
  createReview: async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Successfully made a new review.");
    res.redirect(`/campgrounds/${campground._id}`);
  },

  deleteReview: async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "Successfully deleted a review.");
    res.redirect(`/campgrounds/${id}`);
  },
};

export default reviews;
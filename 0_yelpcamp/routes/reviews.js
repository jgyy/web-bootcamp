import express from "express";
import catchFunc from "../utils/catchAsync.js";
import Campground from "../models/campground.js";
import Review from "../models/review.js";
import isLoggedIn from "../middleware.js";
import { reviewSchema } from "../schemas.js";

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const router = express.Router({mergeParams: true});
router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchFunc(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Successfully made a new review.");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  catchFunc(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "Successfully deleted a review.");
    res.redirect(`/campgrounds/${id}`);
  })
);

export default router;

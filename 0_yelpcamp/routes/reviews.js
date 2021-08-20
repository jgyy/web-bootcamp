import express from "express";
import catchFunc from "../utils/catchAsync.js";
import Campground from "../models/campground.js";
import Review from "../models/review.js";
import reviews from "../controllers/reviews.js";
import { isLoggedIn, validateReview, isReviewAuthor } from "../middleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchFunc(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchFunc(reviews.deleteReview)
);

export default router;

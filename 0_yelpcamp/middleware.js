import ExpressError from "./utils/ExpressError.js";
import Campground from "./models/campground.js";
import Review from "./models/review.js";
import { campgroundSchema, reviewSchema, userSchema } from "./schemas.js";

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.method === "GET") req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in.");
    return res.redirect("/login");
  }
  next();
};

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permissions to do that.");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permissions to do that.");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

export {
  validateCampground,
  validateReview,
  validateUser,
  isLoggedIn,
  isAuthor,
  isReviewAuthor,
};

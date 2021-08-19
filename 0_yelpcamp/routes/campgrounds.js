import express from "express";
import catchFunc from "../utils/catchAsync.js";
import Campground from "../models/campground.js";
import { isLoggedIn, validateCampground, isAuthor } from "../middleware.js";
import {
  campgroundDetails,
  cityList,
  loremSentence,
} from "../seeds/campgroundDetails.js";

const router = express.Router({ mergeParams: true });
router.get(
  "/",
  catchFunc(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get(
  "/new",
  isLoggedIn,
  catchFunc(async (req, res, next) => {
    const campgroundDetail = await campgroundDetails(cityList()[0]);
    res.render("campgrounds/new", { campgroundDetail });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchFunc(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground.");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  catchFunc(async (req, res, next) => {
    const params = {
      lorem: loremSentence(),
      rating: Math.floor(Math.random() * 5) + 1,
      campground: await Campground.findById(req.params.id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("author"),
    };
    if (!params.campground) {
      req.flash("error", "Cannot find that campground.");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", params);
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchFunc(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground.");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchFunc(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    if (!campground) {
      req.flash("error", "Cannot find that campground.");
      return res.redirect("/campgrounds");
    }
    req.flash("success", "Successfully updated existing campground.");
    res.redirect(`/campgrounds/${id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchFunc(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground.");
      return res.redirect("/campgrounds");
    }
    req.flash("success", "Successfully deleted a campground.");
    res.redirect("/campgrounds");
  })
);

export default router;

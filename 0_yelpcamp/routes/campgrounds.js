import express from "express";
import catchFunc from "../utils/catchAsync.js";
import Campground from "../models/campground.js";
import isLoggedIn from "../middleware.js";
import { campgroundSchema } from "../schemas.js";
import {
  campgroundDetails,
  cityList,
  loremSentence,
} from "../seeds/campgroundDetails.js";

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

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
  catchFunc((req, res, next) => {
    const campgroundDetail = campgroundDetails(cityList()[0]);
    res.render("campgrounds/new", { campgroundDetail });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchFunc(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
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
      campground: await Campground.findById(req.params.id).populate("reviews"),
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
  catchFunc(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
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
  validateCampground,
  catchFunc(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "Successfully updated existing campground.");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchFunc(async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted a campground.");
    res.redirect("/campgrounds");
  })
);

export default router;

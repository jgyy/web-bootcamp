import Campground from "../models/campground.js";
import {
  campgroundDetails,
  cityList,
  loremSentence,
} from "../seeds/campgroundDetails.js";

// cg stands for campgrounds
const cg = {
  index: async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  },

  renderNewForm: async (req, res, next) => {
    const campgroundDetail = await campgroundDetails(cityList()[0]);
    res.render("campgrounds/new", { campgroundDetail });
  },

  createCampground: async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground.");
    res.redirect(`/campgrounds/${campground._id}`);
  },

  showCampground: async (req, res, next) => {
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
  },

  renderEditForm: async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground.");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  },

  updateCampground: async (req, res, next) => {
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
  },

  deleteCampground: async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground.");
      return res.redirect("/campgrounds");
    }
    req.flash("success", "Successfully deleted a campground.");
    res.redirect("/campgrounds");
  },
};

export default cg;

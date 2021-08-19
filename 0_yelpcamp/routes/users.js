import express from "express";
import passport from "passport";
import catchFunc from "../utils/catchAsync.js";
import User from "../models/user.js";
import { userSchema } from "../schemas.js";
import { loremSentence } from "../seeds/campgroundDetails.js";

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const router = express.Router({ mergeParams: true });

router.get(
  "/register",
  catchFunc((req, res, next) => {
    const lorem = loremSentence().split(" ");
    const username = (lorem[0] + lorem[1]).toLowerCase();
    res.render("users/register", { username });
  })
);

router.post(
  "/register",
  validateUser,
  catchFunc(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        const redirectUrl = req.session.returnTo || "/campgrounds";
        res.redirect(redirectUrl);
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    }
  })
);

router.get(
  "/login",
  catchFunc((req, res, next) => {
    const lorem = loremSentence().split(" ");
    const username = (lorem[0] + lorem[1]).toLowerCase();
    res.render("users/login", { username });
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  catchFunc(async (req, res, next) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  })
);

router.get(
  "/logout",
  catchFunc((req, res, next) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  })
);

export default router;

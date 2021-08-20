import User from "../models/user.js";
import { loremSentence } from "../seeds/campgroundDetails.js";

const users = {
  renderRegister: (req, res, next) => {
    const lorem = loremSentence().split(" ");
    const username = (lorem[0] + lorem[1]).toLowerCase();
    res.render("users/register", { username });
  },

  register: async (req, res, next) => {
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
  },

  renderLogin: (req, res, next) => {
    const lorem = loremSentence().split(" ");
    const username = (lorem[0] + lorem[1]).toLowerCase();
    res.render("users/login", { username });
  },

  login: async (req, res, next) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  },

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  },
};

export default users;

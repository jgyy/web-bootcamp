import express from "express";
import passport from "passport";
import catchFunc from "../utils/catchAsync.js";
import users from "../controllers/users.js";
import { validateUser } from "../middleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/register")
  .get(catchFunc(users.renderRegister))
  .post(validateUser, catchFunc(users.register));

router
  .route("/login")
  .get(catchFunc(users.renderLogin))
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    catchFunc(users.login)
  );

router.get("/logout", catchFunc(users.logout));

export default router;

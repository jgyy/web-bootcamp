import express from "express";
import multer from "multer";
import catchFunc from "../utils/catchAsync.js";
import campgrounds from "../controllers/campgrounds.js";
import { isLoggedIn, validateCampground, isAuthor } from "../middleware.js";

const upload = multer({ dest: "../images/" });
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(catchFunc(campgrounds.index))
  .post(
    isLoggedIn,
    validateCampground,
    upload.array("image"),
    catchFunc(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, catchFunc(campgrounds.renderNewForm));

router
  .route("/:id")
  .get(catchFunc(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchFunc(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchFunc(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchFunc(campgrounds.renderEditForm)
);

export default router;

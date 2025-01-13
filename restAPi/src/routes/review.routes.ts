import * as express from "express";
import { authentification } from "../middleware/authentification";
import { ReviewController } from "../controllers/review.controllers";

const Router = express.Router();

Router.get("/reviews", authentification, ReviewController.getAllReviews);
Router.post("/reviews", authentification, ReviewController.createReview);
Router.get("/reviews-detail/:id", authentification, ReviewController.getReviewDetails);

Router.put(
  "/reviews/:id",
  authentification,
  ReviewController.updateReview
);
Router.delete(
  "/reviews/:id",
  authentification,
  ReviewController.deleteReview
);
export { Router as reviewRouter };
import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Review } from "../entity/Reviews.entity";
import { AuthRequest } from "../middleware/authentification"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReviewController {
  static async getAllReviews(req: Request, res: Response): Promise<void> {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      res.status(200).json({
        data,
      });
      return
    } else {
      console.log("serving from db");
      const reviewRepository = AppDataSource.getRepository(Review);
      const reviews = await reviewRepository.find();
      cache.put("data", reviews, 10000);
      res.status(200).json({
        data: reviews,
      });
      return
    }
  }
    
  static async createReview(req: AuthRequest, res: Response): Promise<void> {
    const { race_id, text_review, rating } =
      req.body;
    const review = new Review();
    review.race_id = race_id;
    review.user_id = req.currentUser.id;
    review.review = text_review;
    review.rating = rating;
    const reviewRepository = AppDataSource.getRepository(Review);
    await reviewRepository.save(review);
    res
      .status(200)
      .json({ message: "Review created successfully", review });
    return
  }

  static async updateReview(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { race_id, text_review, rating } = req.body;
    const reviewRepository = AppDataSource.getRepository(Review);
    const review = await reviewRepository.findOne({
      where: { id },
    });
    review.race_id = race_id;
    review.user_id = req.currentUser.id;
    review.review = text_review;
    review.rating = rating;
    await reviewRepository.save(review);
    res
      .status(200)
      .json({ message: "Movie updated successfully", review });
    return
  }

  static async deleteReview(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const reviewRepository = AppDataSource.getRepository(Review);
    const review = await reviewRepository.findOne({
      where: { id },
    });
    await reviewRepository.remove(review);
    res
      .status(200)
      .json({ message: "Review deleted successfully", review });
    return
  }

  static async getReviewDetails(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const reviewRepository = AppDataSource.getRepository(Review);
    const review = await reviewRepository.findOne({
      where: { id },
    });
    const raceDetails = await prisma.race.findUnique({
        where: { id: review.race_id },
    });
  
    res.status(200).json({ ...review, raceDetails });
    return
  }
}
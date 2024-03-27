import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { FeedingRepository } from "../repositories/feeding_repository";



// /feeding/...
export const buildFeedingsController = (feedingRepository: FeedingRepository) => {
    const router = Router();
  
    router.post("/", async (req, res) => {
      const feeding = await feedingRepository.createFeeding(req.body);
      res.json({ feeding });
    });
  
    router.get("/reptile/:reptileId", async (req, res) => {
        const reptileId = Number(req.params['reptileId']);
        const feeding = await feedingRepository.getFeedingByReptile(reptileId);
        res.json({feeding});
    });
    
    return router;
  }
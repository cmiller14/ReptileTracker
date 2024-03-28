import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { FeedingRepository } from "../repositories/feeding_repository";



// /feeding/...
export const buildFeedingsController = (feedingRepository: FeedingRepository) => {
    const router = Router();
  
    // create feeding
    router.post("/", async (req, res) => {
      const feeding = await feedingRepository.createFeeding(req.body);
      res.json({ feeding });
    });

    // update a feeding
    router.put("/:feedingId", async (req, res) => {
        const feeding = await feedingRepository.updateFeeding(req.body);
        res.json({feeding});
    });

    // delete a feeding
    router.delete("/:feedingId", async (req, res) => {
        const feedingId = Number(req.params['feedingId']);
        const feeding = await feedingRepository.deleteFeeding(feedingId);
        res.json({feeding});
    })

    // get feedings for a reptile
    router.get("/reptile/:reptileId", async (req, res) => {
        const reptileId = Number(req.params['reptileId']);
        const feeding = await feedingRepository.getFeedingsByReptile(reptileId);
        res.json({feeding});
    });
    
    return router;
  }
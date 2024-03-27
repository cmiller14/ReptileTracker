import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { HusbandryRepository } from "../repositories/husbandry_repository";



// /husbandry/...
export const buildHusbandryController = (husbandryRepository: HusbandryRepository) => {
    const router = Router();
  
    router.post("/", async (req, res) => {
      const husbandry = await husbandryRepository.createHusbandry(req.body);
      res.json({ husbandry });
    });
  
    router.get("/reptile/:reptileId", async (req, res) => {
        const reptileId = Number(req.params['reptileId']);
        const feeding = await husbandryRepository.getHusbandryByReptile(reptileId);
        res.json({feeding});
    });
    
    return router;
  }
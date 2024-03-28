import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { HusbandryRepository } from "../repositories/husbandry_repository";



// /husbandry/...
export const buildHusbandryController = (husbandryRepository: HusbandryRepository) => {
    const router = Router();
  
    // create husbandry
    router.post("/", async (req, res) => {
      const husbandry = await husbandryRepository.createHusbandry(req.body);
      res.json({ husbandry });
    });

    // update husbandry
    router.put("/:husbandryId", async (req, res) => {
        const husbandry = await husbandryRepository.updateHusbandry(req.body);
        res.json({husbandry});
    });

    // delete husbandry
    router.delete("/:husbandryId", async (req, res) => {
        const husbandryId = Number(req.params['husbandryId']);
        const husbandry = await husbandryRepository.deleteHusbandry(husbandryId);
        res.json({husbandry});
    })
  
    // get husbandry for a reptile
    router.get("/reptile/:reptileId", async (req, res) => {
        const reptileId = Number(req.params['reptileId']);
        const feeding = await husbandryRepository.getHusbandryByReptile(reptileId);
        res.json({feeding});
    });
    
    return router;
  }
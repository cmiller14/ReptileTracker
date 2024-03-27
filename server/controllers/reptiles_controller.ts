import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ReptilesRepository } from "../repositories/reptiles_repository";

// /reptiles/...
export const buildReptilesController = (reptilesRepository: ReptilesRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const reptile = await reptilesRepository.createReptile(req.body);
    res.json({reptile});
  });

  router.get("/:reptileId", async (req, res) => {
    const reptileId = Number(req.params['reptileId']);
    const reptile = await reptilesRepository.getReptileById(reptileId)
    res.json({ reptile });
  });

  router.get("/:reptileId/feeding", authMiddleware, async (req, res) => {
    const reptileId = Number(req.params['reptileId']);
    const feeding = await reptilesRepository.getReptileFeeding(reptileId);

  });

  router.get("/:reptileId/schedule", authMiddleware, async (req, res) => {
    const reptileId = Number(req.params['reptileId']);
    const schedule = await reptilesRepository.getReptileSchedule(reptileId);

  });

  router.get("/:reptileId/husbandryrecord", authMiddleware, async (req, res) => {
    const reptileId = Number(req.params['reptileId']);
    const husbandryRecord = await reptilesRepository.getReptileHusbandryRecord(reptileId);

  });

  router.get("/user/:userId", async (req, res) => {
    //TODO: may need to check if the req.user.id matches the userId param
    const userId = Number(req.params['userId']);
    const reptiles = await reptilesRepository.getUserReptiles(userId);
    console.log(reptiles);
    res.json({reptiles});
  });

  return router;
}
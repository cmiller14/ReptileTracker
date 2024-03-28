import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ReptilesRepository } from "../repositories/reptiles_repository";

// /reptiles/...
export const buildReptilesController = (reptilesRepository: ReptilesRepository) => {
  const router = Router();

  // create a reptile
  router.post("/", async (req, res) => {
    const reptile = await reptilesRepository.createReptile(req.body);
    res.json({reptile});
  });

  // delete a reptile
  router.delete("/:reptileId", async (req, res) => {
    const reptileId = Number(req.params['reptileId']);
    const deleted = await reptilesRepository.deleteReptile(reptileId);
    res.json({deleted});
  });

  // update a reptile
  router.put("/:reptileId", async (req, res) => {
    const reptile = await reptilesRepository.updateReptile(req.body);
    res.json({reptile});
  });

  // get a specific reptile
  router.get("/:reptileId", async (req, res) => {
    const reptileId = Number(req.params['reptileId']);
    const reptile = await reptilesRepository.getReptileById(reptileId)
    res.json({ reptile });
  });

  // get all reptiles for a user
  router.get("/user/:userId", async (req, res) => {
    //TODO: may need to check if the req.user.id matches the userId param
    const userId = Number(req.params['userId']);
    const reptiles = await reptilesRepository.getUserReptiles(userId);
    console.log(reptiles);
    res.json({reptiles});
  });

  return router;
}
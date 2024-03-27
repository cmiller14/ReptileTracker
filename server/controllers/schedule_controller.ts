import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ScheduleRepository } from "../repositories/schedule_repository";



// /feeding/...
export const buildScheduleController = (scheduleRepository: ScheduleRepository) => {
    const router = Router();
  
    router.post("/", async (req, res) => {
      const schedule = await scheduleRepository.createSchedule(req.body);
      res.json({ schedule });
    });
  
    router.get("/reptile/:reptileId", async (req, res) => {
        const reptileId = Number(req.params['reptileId']);
        const schedule = await scheduleRepository.getScheduleByReptile(reptileId);
        res.json({schedule});
    });
    
    return router;
  }
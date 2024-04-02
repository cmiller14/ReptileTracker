import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ScheduleRepository } from "../repositories/schedule_repository";



// /schedules/...
export const buildScheduleController = (scheduleRepository: ScheduleRepository) => {
    const router = Router();
  
    // create schedule
    router.post("/", authMiddleware, async (req, res) => {
      const schedule = await scheduleRepository.createSchedule(req.body);
      res.json({ schedule });
    });

    // update a schedule
    router.put("/:scheduleId", authMiddleware, async (req, res) => {
        const schedule = await scheduleRepository.updateSchedule(req.body);
        res.json({schedule});
    });

    // delete a schedule
    router.delete("/:scheduleId", authMiddleware, async (req, res) => {
        const scheduleId = Number(req.params['scheduleId']);
        const schedule = await scheduleRepository.deleteSchedule(scheduleId);
        res.json({schedule});
    })
  
    // get a schedule for a reptile
    router.get("/reptile/:reptileId", authMiddleware, async (req, res) => {
        const reptileId = Number(req.params['reptileId']);
        const schedule = await scheduleRepository.getScheduleByReptile(reptileId);
        res.json({schedule});
    });

    // get scheudles for a user
    router.get("/user/:userId", authMiddleware, async (req, res) => {
        const userId = Number(req.params['userId']);
        const schedules = await scheduleRepository.getSchedulesByUser(userId);
        res.json({schedules});
    })
    
    return router;
  }
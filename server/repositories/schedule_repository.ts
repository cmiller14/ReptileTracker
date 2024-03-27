import { PrismaClient } from "@prisma/client";

export type CreateSchedulePayload = {
    userId:         number,
    reptileId:      number,
    type:           string,
    description:    string,
}

export class ScheduleRepository {
    private db: PrismaClient
    private static instance: ScheduleRepository
    constructor(db: PrismaClient) {
      this.db = db;
    }

    static getInstance(db?: PrismaClient): ScheduleRepository {
        if (!this.instance) {
          this.instance = new ScheduleRepository(db!!);
        }
        return this.instance;
      }

    async createSchedule({userId, reptileId, type, description}: CreateSchedulePayload) {
    return this.db.schedule.create({
        data: {
        userId: userId,
        reptileId: reptileId,
        type: type,
        description: description,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        }
    });
    }

    async getScheduleById(id: number) {
        return this.db.schedule.findUnique({
          where: {
            id: id
          },
        });
      }

    async getScheduleByReptile(id: number) {
    return this.db.schedule.findUnique({
        where: {
            reptileId: id
        }
     });
    }
}
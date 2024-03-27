import { PrismaClient } from "@prisma/client";

export type CreateReptilePayload = {
  userId: number,
  name: string,
  sex: string,
}

export class ReptilesRepository {
  private db: PrismaClient
  private static instance: ReptilesRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ReptilesRepository {
    if (!this.instance) {
      this.instance = new ReptilesRepository(db!!);
    }
    return this.instance;
  }

  async createReptile({userId, name, sex}: CreateReptilePayload) {
    return this.db.reptile.create({
      data: {
        userId: userId,
        name: name,
        sex: sex,
      }
    });
  }

    async getReptileById(id: number) {
    return this.db.reptile.findUnique({
      where: {
        id: id
      },
    });
  }

  async getReptileFeeding(id: number) {
    const reptile = this.db.reptile.findUnique({
        where: {
            id: id
        },
    });

    return reptile.feeding;

  }

  async getReptileSchedule(id: number) {
    const reptile = this.db.reptile.findUnique({
        where: {
            id: id
        },
    });

    return reptile.Schedule;
  }

  async getReptileHusbandryRecord(id: number) {
    const reptile = this.db.reptile.findUnique({
        where: {
            id: id
        },
    });

    return reptile.husbandryRecord;
  }

  async getUserReptiles(id: number) {
    const reptiles = this.db.reptile.findMany({
        where: {
            userId: id
        } 
    });

    return reptiles;
  }
}
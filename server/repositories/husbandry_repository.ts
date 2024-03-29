import { PrismaClient } from "@prisma/client";

export type CreateHusbandryPayload = {
    reptileId:      number,
    length:         number,
    weight:         number,
    temperature:    number,
    humidity:       number,

}

export type UpdateHusbandryPayload = {
    id:             number,
    length:         number,
    weight:         number,
    temperature:    number,
    humidity:       number,   

}

export class HusbandryRepository {
    private db: PrismaClient
    private static instance: HusbandryRepository
    constructor(db: PrismaClient) {
      this.db = db;
    }

    static getInstance(db?: PrismaClient): HusbandryRepository {
        if (!this.instance) {
          this.instance = new HusbandryRepository(db!!);
        }
        return this.instance;
      }

    async createHusbandry({reptileId, length, weight, temperature, humidity}: CreateHusbandryPayload) {
        return this.db.husbandryRecord.create({
            data: {
            reptileId:   reptileId,
            length:      length,
            weight:      weight,
            temperature: temperature,
            humidity:    humidity,
            }
        });
    }

    async updateHusbandry({id, length, weight, temperature, humidity}: UpdateHusbandryPayload) {
        return this.db.husbandryRecord.update({
            where: {
                id: id,
            },
            data: {
                length: length,
                weight: weight,
                temperature: temperature,
                humidity: humidity,
            }
        });
    }

    async deleteHusbandry(id: number) {
        return this.db.husbandryRecord.delete({
            where: {
                id: id,
            },
        });
    }

    async getHusbandryById(id: number) {
        return this.db.husbandryRecord.findUnique({
          where: {
            id: id
          },
        });
      }

    async getHusbandryByReptile(id: number) {
    return this.db.husbandryRecord.findMany({
        where: {
            reptileId: id
            }
        });
    }
    
}
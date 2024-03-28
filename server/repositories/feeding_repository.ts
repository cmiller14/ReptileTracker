import { PrismaClient } from "@prisma/client";

export type CreateFeedingPayload = {
    reptileId: number,
    foodItem:  string,
}

export type UpdateFeedingPayload = {
    id:       number,
    foodItem: string,
}

export class FeedingRepository {
    private db: PrismaClient
    private static instance: FeedingRepository
    constructor(db: PrismaClient) {
      this.db = db;
    }

    static getInstance(db?: PrismaClient): FeedingRepository {
        if (!this.instance) {
          this.instance = new FeedingRepository(db!!);
        }
        return this.instance;
      }

    async createFeeding({reptileId, foodItem}: CreateFeedingPayload) {
        return this.db.feeding.create({
            data: {
                reptileId: reptileId,
                foodItem: foodItem,
            }
    });
    }

    async updateFeeding({foodItem, id}: UpdateFeedingPayload) {
        return this.db.feeding.update({
            where: {
                id: id,
            },
            data: {
                foodItem: foodItem,
            }
        });
    } 

    async deleteFeeding(id: number) {
        return this.db.feeding.delete({
            where: {
                id: id
            },
        });
    }

    async getFeedingById(id: number) {
        return this.db.feeding.findUnique({
          where: {
            id: id
          },
        });
    }

    async getFeedingsByReptile(id: number) {
        return this.db.feeding.findMany({
            where: {
                reptileId: id
            }
        });
    }
    
}



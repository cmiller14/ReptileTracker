import { PrismaClient } from "@prisma/client";

export type CreateReptilePayload = {
  userId: number,
  name: string,
  sex: string,
  species: string,
}

export type UpdateReptilePayload = {
    species: string,
    name: string,
    sex: string,
    id: number,
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

  async createReptile({userId, name, sex, species}: CreateReptilePayload) {
    return this.db.reptile.create({
      data: {
        userId: userId,
        name: name,
        sex: sex,
        species: species,
      }
    });
  }

  async deleteReptile(id: number) {
    return this.db.reptile.delete({
        where: {
            id: id,
        },
    });
  }

  async updateReptile({species, name, sex, id}: UpdateReptilePayload) {
    return this.db.reptile.update({
        where: {
            id: id
        },
        data: {
            species: species,
            name: name,
            sex: sex,
        },
    })
  }

  async getReptileById(id: number) {
    return this.db.reptile.findUnique({
        where: {
        id: id
        },
    });
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
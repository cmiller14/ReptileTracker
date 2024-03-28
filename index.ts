import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buildUsersController } from "./server/controllers/users_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { buildReptilesController } from "./server/controllers/reptiles_controller";
import { UsersRepository } from "./server/repositories/users_respository";
import { ReptilesRepository } from "./server/repositories/reptiles_repository";
import { ScheduleRepository } from "./server/repositories/schedule_repository";
import { FeedingRepository } from "./server/repositories/feeding_repository";
import { HusbandryRepository } from "./server/repositories/husbandry_repository";
import { buildScheduleController } from "./server/controllers/schedule_controller";
import { buildHusbandryController } from "./server/controllers/husbandry_controller";
import { buildFeedingsController } from "./server/controllers/feeding_controller";


const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);
const reptilesRepository = ReptilesRepository.getInstance(db);
const schedulesRepository = ScheduleRepository.getInstance(db);
const feedingRepository = FeedingRepository.getInstance(db);
const husbandryRepository = HusbandryRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}


app.use("/", buildHomeController());
app.use("/users", buildUsersController(usersRepository));
app.use("/sessions", buildSessionsController(db));
app.use("/reptiles", buildReptilesController(reptilesRepository));
app.use("/schedules", buildScheduleController(schedulesRepository));
app.use("/husbandry", buildHusbandryController(husbandryRepository));
app.use("/feeding", buildFeedingsController(feedingRepository));


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});



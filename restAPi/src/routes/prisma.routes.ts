import { PrismaClient } from "@prisma/client";
import * as express from "express";

const Router = express.Router();
const prisma = new PrismaClient();

Router.get("/drivers", async (req, res) => {
  const drivers = await prisma.driver.findMany();
  res.json(drivers);
});

Router.get("/races", async (req, res) => {
  const races = await prisma.race.findMany();
  res.json(races);
});

export { Router as prismaRouter };
import { PrismaClient } from "@prisma/client";
import * as express from "express";

const Router = express.Router();
const prisma = new PrismaClient();

Router.get("/drivers", async (req, res) => {
  const drivers = await prisma.driver.findMany();
  res.json(drivers);
});

export { Router as driverRouter };
import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User.entity";
import { Review } from "./entity/Reviews.entity";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  NODE_ENV,
  F1DB_HOST,
  F1DB_PORT,
  F1DB_USERNAME,
  F1DB_PASSWORD,
  F1DB_DATABASE,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Review],
  synchronize: false,
  logging: false,
});

export const F1DataSource = new DataSource({
  type: "postgres",
  host: F1DB_HOST,
  port: parseInt(F1DB_PORT || "5432"),
  username: F1DB_USERNAME,
  password: F1DB_PASSWORD,
  database: F1DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [],
});

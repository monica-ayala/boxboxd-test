import { AppDataSource, F1DataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { reviewRouter } from "./routes/review.routes";
import { prismaRouter } from "./routes/prisma.routes";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT = 3000 } = process.env;
app.use("/auth", userRouter);
app.use("/f1db-api", prismaRouter)
app.use("/api", reviewRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

Promise.all([AppDataSource.initialize(), F1DataSource.initialize()])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Data Source initialized successfully");
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));

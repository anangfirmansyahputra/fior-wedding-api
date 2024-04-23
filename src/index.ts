import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { prismaExclude } from "prisma-exclude";
import authMiddleware from "./middlewares/auth";
import rootRouter from "./routes";
import permissionRouter from "./routes/permission.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    title: "Fior Wedding App",
    author: "Koding Academy",
  });
});
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({});

export const exclude = prismaExclude(prismaClient);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

export default app;

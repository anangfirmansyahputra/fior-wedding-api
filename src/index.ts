import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { prismaExclude } from "prisma-exclude";
import rootRouter from "./routes";
import fs from "fs";
import path from "path";

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

app.get("/uploads/:filename", (req, res) => {
  const fileName = req.params.filename;
  res.sendFile(path.join(__dirname, "../uploads", fileName));
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

export default app;

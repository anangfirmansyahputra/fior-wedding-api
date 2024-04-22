import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import rootRouter from "./routes";
import { signupSchema } from "./schema/user";
import { prismaExclude } from "prisma-exclude";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({});

export const exclude = prismaExclude(prismaClient);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

export default app;

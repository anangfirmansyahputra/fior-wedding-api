import express, { Request, Response } from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { signupSchema } from "./schema/user";
import { customerBiodataCreateSchema } from "./schema/customer-biodata";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  // log: ["query"],
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = signupSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

// app.use(errorMiddleware);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

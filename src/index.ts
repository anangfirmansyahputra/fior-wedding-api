import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import rootRouter from "./routes";
import { signupSchema } from "./schema/user";
import { prismaExclude } from "prisma-exclude";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  // log: ["query"],
});
// .$extends({
//   query: {
//     user: {
//       create({ args, query }) {
//         args.data = signupSchema.parse(args.data);
//         return query(args);
//       },
//     },
//   },
// });

export const exclude = prismaExclude(prismaClient);

// app.use(errorMiddleware);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

export default app;

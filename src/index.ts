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

// const options = {
//   definition: {
//     openapi: "3.0.3",
//     info: {
//       title: "Fior Wedding API",
//       version: "1.0.0",
//       description:
//         "Fior Wedding API is a RESTful API designed to facilitate wedding planning and management tasks. It provides endpoints for managing vendors, guest invitations, event schedules, RSVPs, payments, and more.",
//       contact: {
//         name: "Anang Firmansyah",
//         email: "anangfirmansyahp5@gmail.com",
//         url: "www.google.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//         description: "Fior Wedding Restful API Server",
//         variables: {
//           environment: {
//             default: "dev",
//             description: "Server Environment",
//             enum: ["dev"],
//           },
//         },
//       },
//     ],
//     paths: {
//       "/signup": {
//         post: {
//           summary: "Signup User",
//           description: "Create a new user",
//           response: {},
//           parameters: [
//             {
//               name: "name",
//               description: "Name of the user",
//               required: true,
//               in: "body",
//             },
//           ],
//         },
//       },
//       "/login": {
//         post: {},
//       },
//       "/refresh-token": {
//         post: {},
//       },
//       "/me": {
//         get: {
//           summary: "Get Current User",
//           description: "Get the current user",
//           response: {},
//           parameters: [
//             {
//               name: "token",
//               description: "Access Token",
//               required: true,
//               in: "headers",
//             },
//           ],
//         },
//       },
//     },
//   },
//   apis: ["./src/routes*.js"], // files containing annotations as above
// };

// app.use(errorMiddleware);

// console.log(expressListEndpoints(app));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

export default app;

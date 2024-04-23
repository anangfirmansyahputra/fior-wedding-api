import { Router } from "express";
import { get } from "../controllers/permissions.controller";
import authMiddleware from "../middlewares/auth";

const permissionRouter: Router = Router();

permissionRouter.get("/", authMiddleware("read_permission"), get);

export default permissionRouter;

import { Router } from "express";
import { create } from "../controllers/permission.controller";
import authMiddleware from "../middlewares/auth";

const permissionRouter: Router = Router();

permissionRouter.post("/", create);

export default permissionRouter;

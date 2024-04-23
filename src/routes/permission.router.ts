import { Router } from "express";
import { create, get } from "../controllers/permission.controller";
import authMiddleware from "../middlewares/auth";

const permissionRouter: Router = Router();

permissionRouter.post("/", create);
permissionRouter.get("/", get);

export default permissionRouter;

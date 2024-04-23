import { Router } from "express";
import { get } from "../controllers/permissions.controller";

const permissionRouter: Router = Router();

permissionRouter.get("/", get);

export default permissionRouter;

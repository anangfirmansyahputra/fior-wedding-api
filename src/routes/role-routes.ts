import { Router } from "express";
import { get } from "../controllers/role.controller";

export const roleRoutes: Router = Router();

roleRoutes.get("/", get);

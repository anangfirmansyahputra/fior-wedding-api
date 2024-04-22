import { Router } from "express";
import { get, update } from "../controllers/role.controller";

export const roleRoutes: Router = Router();

roleRoutes.get("/", get);
roleRoutes.post("/", update);

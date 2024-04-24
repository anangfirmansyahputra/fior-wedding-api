import { Router } from "express";
import { create, get, remove, update } from "../controllers/role.controller";

export const roleRoutes: Router = Router();

roleRoutes.get("/", get);
roleRoutes.post("/", create);
roleRoutes.patch("/:id", update);
roleRoutes.delete("/:id", remove);

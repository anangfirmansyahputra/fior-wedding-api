import { Router } from "express";
import {
  create,
  get,
  remove,
  update,
} from "../controllers/permission.controller";

const permissionRouter: Router = Router();

permissionRouter.post("/", create);
permissionRouter.get("/", get);
permissionRouter.patch("/:id", update);
permissionRouter.delete("/:id", remove);

export default permissionRouter;

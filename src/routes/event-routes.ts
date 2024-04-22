import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  deleteEvent,
} from "../controllers/event-controller";
import authMiddleware from "../middlewares/auth";

const eventRouter = Router();

eventRouter.post("/", authMiddleware, create);
eventRouter.get("/", authMiddleware, get);
eventRouter.get("/:id", authMiddleware, find);
eventRouter.delete("/:id", authMiddleware, deleteEvent);
eventRouter.patch("/:id", authMiddleware, update);

export default eventRouter;

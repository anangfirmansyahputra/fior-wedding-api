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

eventRouter.post("/", create);
eventRouter.get("/", get);
eventRouter.get("/:id", find);
eventRouter.delete("/:id", deleteEvent);
eventRouter.patch("/:id", update);

export default eventRouter;

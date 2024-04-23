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

eventRouter.post("/", authMiddleware("create_event"), create);
eventRouter.get("/", authMiddleware("read_event"), get);
eventRouter.get("/:id", authMiddleware("read_event"), find);
eventRouter.delete("/:id", authMiddleware("delete_event"), deleteEvent);
eventRouter.patch("/:id", authMiddleware("update_event"), update);

export default eventRouter;

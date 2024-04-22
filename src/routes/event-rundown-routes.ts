import { Router } from "express";
import {
  create,
  get,
  update,
  find,
  remove,
} from "../controllers/event-rundown.controller";
import authMiddleware from "../middlewares/auth";

const eventRundownRouter: Router = Router();

eventRundownRouter.get("/:event_id/rundowns", authMiddleware, get);
eventRundownRouter.post("/:event_id/rundowns", authMiddleware, create);
eventRundownRouter.get("/:event_id/rundowns/:id", authMiddleware, find);
eventRundownRouter.patch("/:event_id/rundowns/:id", authMiddleware, update);
eventRundownRouter.delete("/:event_id/rundowns/:id", authMiddleware, remove);

export default eventRundownRouter;

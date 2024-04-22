import { Router } from "express";
import {
  create,
  find,
  get,
  remove,
  update,
} from "../controllers/event-guest-seat-controller";
import authMiddleware from "../middlewares/auth";

const eventGuestSeatRouter: Router = Router();

eventGuestSeatRouter.get("/:event_id/guest-seats", authMiddleware, get);
eventGuestSeatRouter.post("/:event_id/guest-seats/", authMiddleware, create);
eventGuestSeatRouter.get("/:event_id/guest-seats/:id", authMiddleware, find);
eventGuestSeatRouter.patch(
  "/:event_id/guest-seats/:id",
  authMiddleware,
  update
);
eventGuestSeatRouter.delete(
  "/:event_id/guest-seats/:id",
  authMiddleware,
  remove
);

export default eventGuestSeatRouter;

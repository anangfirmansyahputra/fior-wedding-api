import { Router } from "express";
import {
  create,
  find,
  get,
  remove,
  update,
} from "../controllers/event-guest-seat-controller";

const eventGuestSeatRouter: Router = Router();

eventGuestSeatRouter.get("/:event_id/guest-seats", get);
eventGuestSeatRouter.post("/:event_id/guest-seats/", create);
eventGuestSeatRouter.get("/:event_id/guest-seats/:id", find);
eventGuestSeatRouter.patch("/:event_id/guest-seats/:id", update);
eventGuestSeatRouter.delete("/:event_id/guest-seats/:id", remove);

export default eventGuestSeatRouter;

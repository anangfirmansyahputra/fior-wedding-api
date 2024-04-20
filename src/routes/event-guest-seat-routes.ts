import { Router } from "express";
import {
  create,
  find,
  get,
  remove,
  update,
} from "../controllers/event-guest-seat-controller";

const eventGuestSeatRouter: Router = Router();

eventGuestSeatRouter.get("/", get);
eventGuestSeatRouter.post("/", create);
eventGuestSeatRouter.get("/:id", find);
eventGuestSeatRouter.patch("/:id", update);
eventGuestSeatRouter.delete("/:id", remove);

export default eventGuestSeatRouter;

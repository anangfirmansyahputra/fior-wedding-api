import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/guest-lits";
import authMiddleware from "../../middlewares/auth";

const eventGuestListRouter = Router();

eventGuestListRouter.post(
  "/:event_id/guest-lists",
  authMiddleware("create_event_guest_list"),
  create
);

eventGuestListRouter.get(
  "/:event_id/guest-lists",
  authMiddleware("read_event_guest_list"),
  get
);

eventGuestListRouter.get(
  "/:event_id/guest-lists/:id",
  authMiddleware("read_event_guest_list"),
  find
);

eventGuestListRouter.patch(
  "/:event_id/guest-lists/:id",
  authMiddleware("update_event_guest_list"),
  update
);

eventGuestListRouter.delete(
  "/:event_id/guest-lists/:id",
  authMiddleware("delete_event_guest_list"),
  remove
);

export default eventGuestListRouter;

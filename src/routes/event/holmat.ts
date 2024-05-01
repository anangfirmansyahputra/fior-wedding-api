import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/holmat";
import authMiddleware from "../../middlewares/auth";

const eventHolmat = Router();

eventHolmat.post(
  "/:event_id/holmats",
  authMiddleware("create_event_holmat"),
  create
);

eventHolmat.get("/:event_id/holmats", authMiddleware("read_event_holmat"), get);

eventHolmat.get(
  "/:event_id/holmats/:id",
  authMiddleware("read_event_holmat"),
  find
);

eventHolmat.patch(
  "/:event_id/holmats/:id",
  authMiddleware("update_event_holmat"),
  update
);

eventHolmat.delete(
  "/:event_id/holmats/:id",
  authMiddleware("delete_event_holmat"),
  remove
);

export default eventHolmat;

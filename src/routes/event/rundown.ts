import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/rundown";
import authMiddleware from "../../middlewares/auth";

const eventRundownRouter = Router();

eventRundownRouter.post(
  "/:event_id/rundowns",
  authMiddleware("create_event_rundown"),
  create
);

eventRundownRouter.get(
  "/:event_id/rundowns",
  authMiddleware("read_event_rundown"),
  get
);

eventRundownRouter.get(
  "/:event_id/rundowns/:id",
  authMiddleware("read_event_rundown"),
  find
);

eventRundownRouter.patch(
  "/:event_id/rundowns/:id",
  authMiddleware("update_event_rundown"),
  update
);

eventRundownRouter.delete(
  "/:event_id/rundowns/:id",
  authMiddleware("delete_event_rundown"),
  remove
);

export default eventRundownRouter;

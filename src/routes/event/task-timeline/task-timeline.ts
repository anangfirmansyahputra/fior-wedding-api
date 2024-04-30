import { Router } from "express";
import {
  create,
  find,
  get,
  remove,
  update,
} from "../../../controllers/event/task-timeline/task-timeline";
import authMiddleware from "../../../middlewares/auth";

const eventTaskTimelineRouter = Router();

eventTaskTimelineRouter.post(
  "/:event_id/task-timelines",
  authMiddleware("create_event_task_timeline"),
  create
);
eventTaskTimelineRouter.get(
  "/:event_id/task-timelines",
  authMiddleware("read_event_task_timeline"),
  get
);
eventTaskTimelineRouter.get(
  "/:event_id/task-timelines/:id",
  authMiddleware("read_event_task_timeline"),
  find
);
eventTaskTimelineRouter.patch(
  "/:event_id/task-timelines/:id",
  authMiddleware("update_event_task_timeline"),
  update
);
eventTaskTimelineRouter.delete(
  "/:event_id/task-timelines/:id",
  authMiddleware("delete_event_task_timeline"),
  remove
);

export default eventTaskTimelineRouter;

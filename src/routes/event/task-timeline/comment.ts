import { Router } from "express";
import authMiddleware from "../../../middlewares/auth";
import {
  create,
  find,
  get,
  remove,
  update,
} from "../../../controllers/event/task-timeline/comment";

const eventTaskTimelineComment = Router();

eventTaskTimelineComment.post(
  "/:event_id/task-timelines/:task_timeline_id/comments",
  authMiddleware("create_event_task_timeline_comment"),
  create
);
eventTaskTimelineComment.get(
  "/:event_id/task-timelines/:task_timeline_id/comments",
  authMiddleware("read_event_task_timeline_comment"),
  get
);
eventTaskTimelineComment.get(
  "/:event_id/task-timelines/:task_timeline_id/comments/:id",
  authMiddleware("read_event_task_timeline_comment"),
  find
);
eventTaskTimelineComment.patch(
  "/:event_id/task-timelines/:task_timeline_id/comments/:id",
  authMiddleware("update_event_task_timeline_comment"),
  update
);
eventTaskTimelineComment.delete(
  "/:event_id/task-timelines/:task_timeline_id/comments/:id",
  authMiddleware("delete_event_task_timeline_comment"),
  remove
);

export default eventTaskTimelineComment;

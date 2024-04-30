import { Router } from "express";
import authMiddleware from "../../../middlewares/auth";
import {
  create,
  find,
  get,
  remove,
  update,
} from "../../../controllers/event/task-timeline/attachment";

const eventTaskTimelineAttachment = Router();

eventTaskTimelineAttachment.post(
  "/:event_id/task-timelines/:task_timeline_id/attachments",
  authMiddleware("create_event_task_timeline_attachment"),
  create
);
eventTaskTimelineAttachment.get(
  "/:event_id/task-timelines/:task_timeline_id/attachments",
  authMiddleware("read_event_task_timeline_attachment"),
  get
);
eventTaskTimelineAttachment.get(
  "/:event_id/task-timelines/:task_timeline_id/attachments/:id",
  authMiddleware("read_event_task_timeline_attachment"),
  find
);
eventTaskTimelineAttachment.patch(
  "/:event_id/task-timelines/:task_timeline_id/attachments/:id",
  authMiddleware("update_event_task_timeline_attachment"),
  update
);
eventTaskTimelineAttachment.delete(
  "/:event_id/task-timelines/:task_timeline_id/attachments/:id",
  authMiddleware("delete_event_task_timeline_attachment"),
  remove
);

export default eventTaskTimelineAttachment;

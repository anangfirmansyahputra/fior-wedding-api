import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/holmat-checklist";
import authMiddleware from "../../middlewares/auth";

const eventHolmatChecklist = Router();

eventHolmatChecklist.post(
  "/:event_id/holmats/:holmat_id/checklists",
  authMiddleware("create_event_holmat_checklist"),
  create
);

eventHolmatChecklist.get(
  "/:event_id/holmats/:holmat_id/checklists",
  authMiddleware("read_event_holmat_checklist"),
  get
);

eventHolmatChecklist.get(
  "/:event_id/holmats/:holmat_id/checklists/:id",
  authMiddleware("read_event_holmat_checklist"),
  find
);

eventHolmatChecklist.patch(
  "/:event_id/holmats/:holmat_id/checklists/:id",
  authMiddleware("update_event_holmat_checklist"),
  update
);

eventHolmatChecklist.delete(
  "/:event_id/holmats/:holmat_id/checklists/:id",
  authMiddleware("delete_event_holmat_checklist"),
  remove
);

export default eventHolmatChecklist;

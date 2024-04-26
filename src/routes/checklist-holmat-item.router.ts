import { Router } from "express";
import {
  create,
  get,
  find,
  remove,
  update,
} from "../controllers/checklist-holmat-items.controller";

const checklistHolmatItemRouter = Router();

checklistHolmatItemRouter.post(
  "/:event_id/checklist-holmats/:checklist_id/items",
  create
);
checklistHolmatItemRouter.get(
  "/:event_id/checklist-holmats/:checklist_id/items",
  get
);
checklistHolmatItemRouter.get(
  "/:event_id/checklist-holmats/:checklist_id/items/:id",
  find
);
checklistHolmatItemRouter.patch(
  "/:event_id/checklist-holmats/:checklist_id/items/:id",
  update
);
checklistHolmatItemRouter.delete(
  "/:event_id/checklist-holmats/:checklist_id/items/:id",
  remove
);

export default checklistHolmatItemRouter;

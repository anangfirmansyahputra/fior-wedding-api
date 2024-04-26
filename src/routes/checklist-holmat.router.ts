import { Router } from "express";
import {
  create,
  get,
  update,
  find,
  remove,
} from "../controllers/checklist-holmat.controller";

const checklistHolmatRouter = Router();

checklistHolmatRouter.post("/:event_id/checklist-holmats", create);
checklistHolmatRouter.get("/:event_id/checklist-holmats", get);
checklistHolmatRouter.patch("/:event_id/checklist-holmats/:id", update);
checklistHolmatRouter.get("/:event_id/checklist-holmats/:id", find);
checklistHolmatRouter.delete("/:event_id/checklist-holmats/:id", remove);

export default checklistHolmatRouter;

import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/biodata";
import authMiddleware from "../../middlewares/auth";

const biodata = Router();

biodata.post(
  "/:event_id/biodatas",
  authMiddleware("create_event_biodata"),
  create
);
biodata.get("/:event_id/biodatas", authMiddleware("read_event_biodata"), get);
biodata.get(
  "/:event_id/biodatas/:id",
  authMiddleware("read_event_biodata"),
  find
);
biodata.patch(
  "/:event_id/biodatas/:id",
  authMiddleware("update_event_biodata"),
  update
);
biodata.delete(
  "/:event_id/biodatas/:id",
  authMiddleware("delete_event_biodata"),
  remove
);

export default biodata;

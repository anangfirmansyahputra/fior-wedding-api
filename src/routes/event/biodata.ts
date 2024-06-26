import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/biodata";
import authMiddleware from "../../middlewares/auth";
import { handleMulterError, upload } from "../../lib/multer";

const biodata = Router();

biodata.post(
  "/:event_id/biodatas",
  authMiddleware("create_event_biodata"),
  upload.single("file"),
  handleMulterError,
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
  upload.single("file"),
  handleMulterError,
  update
);
biodata.delete(
  "/:event_id/biodatas/:id",
  authMiddleware("delete_event_biodata"),
  remove
);

export default biodata;

import { Router } from "express";
import {
  create,
  find,
  get,
  remove,
  update,
} from "../controllers/vendor-note.controller";
import authMiddleware from "../middlewares/auth";

const vendorNoteRouter = Router();

vendorNoteRouter.post(
  "/:id/notes",
  authMiddleware("create_vendor_note"),
  create
);

vendorNoteRouter.get("/:id/notes", authMiddleware("read_vendor_note"), get);
vendorNoteRouter.get(
  "/:id/notes/:note_id",
  authMiddleware("read_vendor_note"),
  find
);
vendorNoteRouter.patch(
  "/:id/notes/:note_id",
  authMiddleware("read_vendor_note"),
  update
);
vendorNoteRouter.delete(
  "/:id/notes/:note_id",
  authMiddleware("read_vendor_note"),
  remove
);

export default vendorNoteRouter;

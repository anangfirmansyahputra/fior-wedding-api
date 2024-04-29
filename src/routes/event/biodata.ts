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

biodata.post("/:event_id/biodatas", authMiddleware(), create);
biodata.get("/:event_id/biodatas", authMiddleware(), get);
biodata.get("/:event_id/biodatas/:id", authMiddleware(), find);
biodata.patch("/:event_id/biodatas/:id", authMiddleware(), update);
biodata.delete("/:event_id/biodatas/:id", authMiddleware(), remove);

export default biodata;

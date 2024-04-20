import { Router } from "express";
import {
  create,
  deleteEventVendor,
  find,
  get,
} from "../controllers/event-vendor-controller";

export const eventVendorRouter: Router = Router();

eventVendorRouter.get("/:event_id/vendors", get);
eventVendorRouter.get("/:event_id/vendors/:id", find);
eventVendorRouter.post("/:event_id/vendors/", create);
eventVendorRouter.delete("/:event_id/vendors/:id", deleteEventVendor);

import { Router } from "express";
import {
  create,
  deleteEventVendor,
  find,
  get,
} from "../controllers/event-vendor-controller";
import authMiddleware from "../middlewares/auth";

export const eventVendorRouter: Router = Router();

eventVendorRouter.get("/:event_id/vendors", authMiddleware, get);
eventVendorRouter.get("/:event_id/vendors/:id", authMiddleware, find);
eventVendorRouter.post("/:event_id/vendors/", authMiddleware, create);
eventVendorRouter.delete(
  "/:event_id/vendors/:id",
  authMiddleware,
  deleteEventVendor
);

import { Router } from "express";
import {
  create,
  deleteEventVendor,
  find,
  get,
} from "../controllers/event-vendor-controller";

export const eventVendorRouter: Router = Router();

eventVendorRouter.get("/", get);
eventVendorRouter.get("/:id", find);
eventVendorRouter.post("/", create);
eventVendorRouter.delete("/:id", deleteEventVendor);

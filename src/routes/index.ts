import { Router } from "express";
import authRouter from "./auth-routes";
import customerBiodataRouter from "./customer-biodata-routes";
import customerRouter from "./customer-routes";
import eventGuestSeatRouter from "./event-guest-seat-routes";
import eventPaymentRouter from "./event-payment-router";
import eventRouter from "./event.router";
import eventRundownRouter from "./event-rundown-routes";
import { eventVendorRouter } from "./event-vendor-routes";
import { vendorCategoryRouter } from "./vendor-category-routes";
import { vendorRouter } from "./vendor-routes";
import { roleRoutes } from "./role.router";
import permissionRouter from "./permission.router";
import vendorNoteRouter from "./vendor-note.router";
import checklistHolmatRouter from "./checklist-holmat.router";
import checklistHolmatItemRouter from "./checklist-holmat-item.router";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customers", [customerRouter, customerBiodataRouter]);
rootRouter.use("/vendor-categories", vendorCategoryRouter);
rootRouter.use("/vendors", [vendorRouter, vendorNoteRouter]);
rootRouter.use("/events", [
  eventRouter,
  eventRundownRouter,
  eventPaymentRouter,
  eventGuestSeatRouter,
  eventVendorRouter,
  checklistHolmatRouter,
  checklistHolmatItemRouter,
]);
rootRouter.use("/roles", roleRoutes);
rootRouter.use("/permissions", permissionRouter);

export default rootRouter;

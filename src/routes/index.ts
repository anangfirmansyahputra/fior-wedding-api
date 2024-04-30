import { Router } from "express";
import authRouter from "./auth-routes";
import customerRouter from "./customer-routes";
import eventRouter from "./event/event";
import { eventVendorRouter } from "./event-vendor-routes";
import { vendorCategoryRouter } from "./vendor-category-routes";
import { vendorRouter } from "./vendor";
import { roleRoutes } from "./role.router";
import permissionRouter from "./permission.router";
import vendorNoteRouter from "./vendor-note.router";
import collaborator from "./event/collaborator";
import biodata from "./event/biodata";
import eventRundownRouter from "./event/rundown";
import eventTaskTimelineRouter from "./event/task-timeline/task-timeline";
import eventTaskTimelineComment from "./event/task-timeline/comment";
import eventTaskTimelineAttachment from "./event/task-timeline/attachment";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customers", [customerRouter]);
rootRouter.use("/vendor-categories", vendorCategoryRouter);
rootRouter.use("/vendors", [vendorRouter, vendorNoteRouter]);
rootRouter.use("/events", [
  eventRouter,
  eventVendorRouter,
  collaborator,
  biodata,
  eventRundownRouter,
  eventTaskTimelineRouter,
  eventTaskTimelineComment,
  eventTaskTimelineAttachment,
]);
rootRouter.use("/roles", roleRoutes);
rootRouter.use("/permissions", permissionRouter);

export default rootRouter;

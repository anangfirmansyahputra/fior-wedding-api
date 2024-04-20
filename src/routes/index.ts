import { Router } from "express";
import authRouter from "./auth-routes";
import customerBiodataRouter from "./customer-biodata-routes";
import { vendorCategoryRouter } from "./vendor-category-routes";
import { vendorRouter } from "./vendor-routes";
import customerRouter from "./customer-routes";
import eventRouter from "./event-routes";
import { eventVendorRouter } from "./event-vendor-routes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customers", customerRouter);
rootRouter.use("/customer-biodatas", customerBiodataRouter);
rootRouter.use("/vendor-categories", vendorCategoryRouter);
rootRouter.use("/vendors", vendorRouter);
rootRouter.use("/events", eventRouter);
rootRouter.use("/event-vendors", eventVendorRouter);

export default rootRouter;

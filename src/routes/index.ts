import { Router } from "express";
import authRouter from "./auth-routes";
import customerBiodataRouter from "./customer-biodata-routes";
import { vendorCategoryRouter } from "./vendor-category-routes";
import { vendorRouter } from "./vendor-routes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customer-biodatas", customerBiodataRouter);
rootRouter.use("/vendor-categories", vendorCategoryRouter);
rootRouter.use("/vendors", vendorRouter);

export default rootRouter;

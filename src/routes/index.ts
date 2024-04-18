import { Router } from "express";
import authRouter from "./auth";
import customerBiodataRouter from "./customer-biodata";
import { countryRouter } from "./country";
import { vendorCategoryRouter } from "./vendor-category";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/customer-biodata", customerBiodataRouter);
rootRouter.use("/countries", countryRouter);
rootRouter.use("/vendor-categories", vendorCategoryRouter);

export default rootRouter;

import { Router } from "express";
import { getVendors, scrappingVendor } from "../controllers/vendor-controller";

export const vendorRouter: Router = Router();

vendorRouter.get("/", getVendors);
vendorRouter.post("/scrapping", scrappingVendor);

import { Router } from "express";
import {
  getVendorCategory,
  scrappingVendorCategory,
} from "../controllers/vendor-category-controller";

export const vendorCategoryRouter: Router = Router();

vendorCategoryRouter.get("/", getVendorCategory);
vendorCategoryRouter.post("/scrapping", scrappingVendorCategory);

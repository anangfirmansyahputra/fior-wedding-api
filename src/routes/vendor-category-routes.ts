import { Router } from "express";
import {
  getVendorCategory,
  scrappingVendorCategory,
} from "../controllers/vendor-category-controller";
import authMiddleware from "../middlewares/auth";

export const vendorCategoryRouter: Router = Router();

vendorCategoryRouter.get(
  "/",
  authMiddleware("read_vendor_category"),
  getVendorCategory
);
vendorCategoryRouter.post(
  "/scrapping",
  authMiddleware("scrapping_vendor_category"),
  scrappingVendorCategory
);

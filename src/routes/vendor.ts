import { Router } from "express";
import {
  getVendors,
  scrappingVendor,
  create,
  find,
  update,
  remove,
} from "../controllers/vendor";
import authMiddleware from "../middlewares/auth";
import { handleMulterError, upload } from "../lib/multer";

export const vendorRouter: Router = Router();

vendorRouter.get("/", authMiddleware("read_vendor"), getVendors);
vendorRouter.post(
  "/",
  authMiddleware("create_vendor"),
  upload.single("file"),
  handleMulterError,
  create
);
vendorRouter.get("/:id", authMiddleware("read_vendor"), find);
vendorRouter.patch(
  "/:id",
  authMiddleware("update_vendor"),
  upload.single("file"),
  handleMulterError,
  update
);
vendorRouter.delete(
  "/:id",
  authMiddleware("delete_vendor"),
  upload.single("file"),
  handleMulterError,
  remove
);

vendorRouter.post(
  "/scrapping",
  authMiddleware("scrapping_vendor"),
  scrappingVendor
);

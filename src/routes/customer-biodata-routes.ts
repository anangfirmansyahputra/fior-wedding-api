import { Router } from "express";
import {
  create,
  deleteCustomer,
  find,
  gets,
  update,
} from "../controllers/customer-biodata-controller";
import authMiddleware from "../middlewares/auth";

const customerBiodataRouter = Router();

customerBiodataRouter.post("/:customer_id/biodatas", authMiddleware, create);
customerBiodataRouter.get("/:customer_id/biodatas", authMiddleware, gets);
customerBiodataRouter.get("/:customer_id/biodatas/:id", authMiddleware, find);
customerBiodataRouter.patch(
  "/:customer_id/biodatas/:id",
  authMiddleware,
  update
);
customerBiodataRouter.delete(
  "/:customer_id/biodatas/:id",
  authMiddleware,
  deleteCustomer
);

export default customerBiodataRouter;

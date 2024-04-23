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

customerBiodataRouter.post(
  "/:customer_id/biodatas",
  authMiddleware("create_customer_biodata"),
  create
);
customerBiodataRouter.get(
  "/:customer_id/biodatas",
  authMiddleware("read_customer_biodata"),
  gets
);
customerBiodataRouter.get(
  "/:customer_id/biodatas/:id",
  authMiddleware("read_customer_biodata"),
  find
);
customerBiodataRouter.patch(
  "/:customer_id/biodatas/:id",
  authMiddleware("update_customer_biodata"),
  update
);
customerBiodataRouter.delete(
  "/:customer_id/biodatas/:id",
  authMiddleware("delete_customer_biodata"),
  deleteCustomer
);

export default customerBiodataRouter;

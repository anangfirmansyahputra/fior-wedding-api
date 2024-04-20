import { Router } from "express";
import {
  create,
  deleteCustomer,
  find,
  gets,
  update,
} from "../controllers/customer-biodata-controller";

const customerBiodataRouter = Router();

customerBiodataRouter.post("/:customer_id/biodatas", create);
customerBiodataRouter.get("/:customer_id/biodatas", gets);
customerBiodataRouter.get("/:customer_id/biodatas/:id", find);
customerBiodataRouter.patch("/:customer_id/biodatas/:id", update);
customerBiodataRouter.delete("/:customer_id/biodatas/:id", deleteCustomer);

export default customerBiodataRouter;

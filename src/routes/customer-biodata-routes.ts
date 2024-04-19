import { Router } from "express";
import {
  create,
  deleteCustomer,
  find,
  gets,
  update,
} from "../controllers/customer-biodata-controller";

const customerBiodataRouter = Router();

customerBiodataRouter.post("/", create);
customerBiodataRouter.get("/", gets);
customerBiodataRouter.get("/:id", find);
customerBiodataRouter.patch("/:id", update);
customerBiodataRouter.delete("/:id", deleteCustomer);

export default customerBiodataRouter;

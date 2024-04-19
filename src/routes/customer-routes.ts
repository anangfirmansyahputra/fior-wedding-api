import { Router } from "express";
import {
  create,
  deleteCustomer,
  find,
  gets,
} from "../controllers/customer-controller";

const customerRouter = Router();

customerRouter.get("/", gets);
customerRouter.post("/", create);
customerRouter.get("/:id", find);
customerRouter.delete("/:id", deleteCustomer);

export default customerRouter;

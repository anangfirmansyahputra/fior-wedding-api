import { Router } from "express";
import {
  create,
  deleteCustomer,
  find,
  gets,
} from "../controllers/customer-controller";
import authMiddleware from "../middlewares/auth";

const customerRouter = Router();

customerRouter.get("/", authMiddleware("read_customer"), gets);
customerRouter.post("/", authMiddleware("create_customer"), create);
customerRouter.get("/:id", authMiddleware("read_customer"), find);
customerRouter.delete(
  "/:id",
  authMiddleware("delete_customer"),
  deleteCustomer
);

export default customerRouter;

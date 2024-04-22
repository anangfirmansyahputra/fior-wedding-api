import { Router } from "express";
import {
  create,
  deleteCustomer,
  find,
  gets,
} from "../controllers/customer-controller";
import authMiddleware from "../middlewares/auth";

const customerRouter = Router();

customerRouter.get("/", authMiddleware, gets);
customerRouter.post("/", authMiddleware, create);
customerRouter.get("/:id", authMiddleware, find);
customerRouter.delete("/:id", authMiddleware, deleteCustomer);

export default customerRouter;

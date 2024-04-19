import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { create, gets } from "../controllers/customer-controller";

const customerRouter = Router();

customerRouter.post("/", create);
customerRouter.get("/", gets);

export default customerRouter;

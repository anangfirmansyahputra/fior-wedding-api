import { Router } from "express";
import { create, gets } from "../controllers/customer-biodata-controller";
import authMiddleware from "../middlewares/auth";

const customerBiodataRouter = Router();

customerBiodataRouter.post("/", [authMiddleware], create);
customerBiodataRouter.get("/", [authMiddleware], gets);

export default customerBiodataRouter;

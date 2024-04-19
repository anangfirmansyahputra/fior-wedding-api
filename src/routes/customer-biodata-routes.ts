import { Router } from "express";
import { create } from "../controllers/customer-biodata-controller";
import authMiddleware from "../middlewares/auth";

const customerBiodataRouter = Router();

customerBiodataRouter.post("/", [authMiddleware], create);

export default customerBiodataRouter;

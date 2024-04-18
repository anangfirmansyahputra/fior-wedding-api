import { Router } from "express";
import { create } from "../controllers/customer-biodata";
import authMiddleware from "../middlewares/auth";

const customerBiodataRouter = Router();

customerBiodataRouter.post("/", [authMiddleware], create);

export default customerBiodataRouter;

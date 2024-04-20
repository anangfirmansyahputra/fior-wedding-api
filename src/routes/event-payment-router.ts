import { Router } from "express";
import { get } from "../controllers/event-payment-controller";

const eventPaymentRouter: Router = Router();

eventPaymentRouter.get("/", get);

export default eventPaymentRouter;

import { Router } from "express";
import {
  create,
  deleteEventPayment,
  find,
  get,
  update,
} from "../controllers/event-payment-controller";

const eventPaymentRouter: Router = Router();

eventPaymentRouter.get("/", get);
eventPaymentRouter.post("/", create);
eventPaymentRouter.get("/:id", find);
eventPaymentRouter.patch("/:id", update);
eventPaymentRouter.delete("/:id", deleteEventPayment);

export default eventPaymentRouter;

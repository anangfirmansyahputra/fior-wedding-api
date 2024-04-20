import { Router } from "express";
import {
  create,
  deleteEventPayment,
  find,
  get,
  update,
} from "../controllers/event-payment-controller";

const eventPaymentRouter: Router = Router();

eventPaymentRouter.get("/:event_id/payments", get);
eventPaymentRouter.post("/:event_id/payments", create);
eventPaymentRouter.get("/:event_id/payments/:id", find);
eventPaymentRouter.patch("/:event_id/payments/:id", update);
eventPaymentRouter.delete("/:event_id/payments/:id", deleteEventPayment);

export default eventPaymentRouter;

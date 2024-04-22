import { Router } from "express";
import {
  create,
  deleteEventPayment,
  find,
  get,
  update,
} from "../controllers/event-payment-controller";
import authMiddleware from "../middlewares/auth";

const eventPaymentRouter: Router = Router();

eventPaymentRouter.get("/:event_id/payments", authMiddleware, get);
eventPaymentRouter.post("/:event_id/payments", authMiddleware, create);
eventPaymentRouter.get("/:event_id/payments/:id", authMiddleware, find);
eventPaymentRouter.patch("/:event_id/payments/:id", authMiddleware, update);
eventPaymentRouter.delete(
  "/:event_id/payments/:id",
  authMiddleware,
  deleteEventPayment
);

export default eventPaymentRouter;

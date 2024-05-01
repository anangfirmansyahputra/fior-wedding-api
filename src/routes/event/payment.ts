import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/payment";

const eventPaymentRouter = Router();

eventPaymentRouter.post(
  "/:event_id/expenses/:expense_id/payments",
  authMiddleware("create_event_payment"),
  create
);

eventPaymentRouter.get(
  "/:event_id/expenses/:expense_id/payments",
  authMiddleware("read_event_payment"),
  get
);

eventPaymentRouter.get(
  "/:event_id/expenses/:expense_id/payments/:id",
  authMiddleware("read_event_payment"),
  find
);

eventPaymentRouter.patch(
  "/:event_id/expenses/:expense_id/payments/:id",
  authMiddleware("update_event_payment"),
  update
);

eventPaymentRouter.delete(
  "/:event_id/expenses/:expense_id/payments/:id",
  authMiddleware("delete_event_payment"),
  remove
);

export default eventPaymentRouter;

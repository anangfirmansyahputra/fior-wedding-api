import { Router } from "express";
import {
  create,
  get,
  find,
  update,
  remove,
} from "../../controllers/event/expense";
import authMiddleware from "../../middlewares/auth";

const eventExpenseRouter = Router();

eventExpenseRouter.post(
  "/:event_id/expenses",
  authMiddleware("create_event_expense"),
  create
);

eventExpenseRouter.get(
  "/:event_id/expenses",
  authMiddleware("read_event_expense"),
  get
);

eventExpenseRouter.get(
  "/:event_id/expenses/:id",
  authMiddleware("read_event_expense"),
  find
);

eventExpenseRouter.patch(
  "/:event_id/expenses/:id",
  authMiddleware("update_event_expense"),
  update
);

eventExpenseRouter.delete(
  "/:event_id/expenses/:id",
  authMiddleware("delete_event_expense"),
  remove
);

export default eventExpenseRouter;

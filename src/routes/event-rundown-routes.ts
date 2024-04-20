import { Router } from "express";
import {
  create,
  get,
  update,
  find,
  remove,
} from "../controllers/event-rundown.controller";

const eventRundownRouter: Router = Router();

eventRundownRouter.get("/:event_id/rundowns", get);
eventRundownRouter.post("/:event_id/rundowns", create);
eventRundownRouter.get("/:event_id/rundowns/:id", find);
eventRundownRouter.patch("/:event_id/rundowns/:id", update);
eventRundownRouter.delete("/:event_id/rundowns/:id", remove);

export default eventRundownRouter;

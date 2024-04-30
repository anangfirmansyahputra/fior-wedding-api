import { Router } from "express";
import { create } from "../../controllers/event/collaborator";
import authMiddleware from "../../middlewares/auth";

const collaborator = Router();

collaborator.post(
  "/:event_id/collaborators",
  authMiddleware("create_event_collaborator"),
  create
);

export default collaborator;

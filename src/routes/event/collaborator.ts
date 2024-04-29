import { Router } from "express";
import { create } from "../../controllers/event/collaborator";

const collaborator = Router();

collaborator.post("/:event_id/collaborators", create);

export default collaborator;

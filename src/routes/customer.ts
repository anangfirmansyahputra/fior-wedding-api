import { Router } from "express";
import { create, remove, find, get, update } from "../controllers/customer";
import authMiddleware from "../middlewares/auth";

const customerRouter = Router();

customerRouter.get("/", authMiddleware("read_customer"), get);
customerRouter.post("/", authMiddleware("create_customer"), create);
customerRouter.get("/:id", authMiddleware("read_customer"), find);
customerRouter.get("/:id", authMiddleware("update_customer"), update);
customerRouter.delete("/:id", authMiddleware("delete_customer"), remove);

export default customerRouter;

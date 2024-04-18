import { Request, Response, Router } from "express";
import { login, signup, me } from "../controllers/auth";
import authMiddleware from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.get("/me", [authMiddleware], me);

export default authRouter;

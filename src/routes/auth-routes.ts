import { Request, Response, Router } from "express";
import {
  login,
  signup,
  me,
  refreshToken,
} from "../controllers/auth-controller";
import authMiddleware from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/refresh-token", refreshToken);
authRouter.get("/me", [authMiddleware], me);

export default authRouter;

import { Request, Response, Router } from "express";
import {
  login,
  signup,
  me,
  refreshToken,
  update,
} from "../controllers/auth-controller";
import authMiddleware from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/refresh-token", refreshToken);
authRouter.get("/me", [authMiddleware], me);
authRouter.patch("/me", [authMiddleware], update);

export default authRouter;

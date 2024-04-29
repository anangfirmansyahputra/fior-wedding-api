import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { errorResponse } from "../exceptions/error";

const authMiddleware = (permission?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.headers.authorization;

    if (!access_token) {
      return errorResponse({
        res,
        type: "token not provided",
        message: "Token not provided",
      });
    }

    try {
      const decodedToken = jwt.decode(access_token, { complete: true });
      // @ts-ignore
      const permissions = decodedToken.payload?.permissions;

      if (decodedToken) {
        // @ts-ignore
        const expirationTime = decodedToken.payload.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime >= expirationTime) {
          // console.log("Token telah kedaluwarsa");
          return errorResponse({
            res,
            type: "token expired",
            message: "Token is expired",
          });
        }
      }

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY!
      ) as any;

      const user = await prismaClient.user.findFirst({
        where: {
          id: payload.id,
          access_token,
        },
        include: {
          role: true,
          event_collaborators: true,
        },
      });

      if (!user) {
        return errorResponse({
          res,
          type: "unauthorized",
          message: "Unauthorized",
        });
      }

      if (!permission) {
        req.user = user;
        return next();
      }

      if (!permissions.includes(permission)) {
        return errorResponse({
          res,
          type: "no permissions",
          message: "This account has no permissions",
        });
      }

      req.user = user;

      return next();
    } catch (err) {
      return errorResponse({
        res,
        type: "unauthorized",
        message: "Unauthorized",
      });
    }
  };
};

export default authMiddleware;

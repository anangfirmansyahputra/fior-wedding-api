import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { ErrorCode, getErrorMessage } from "../lib/error-code";

const authMiddleware = (permission?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // const path = req.path.substring(1).replace("/", ".");
    // const method = req.method.toLowerCase();
    // const arrayPath = req.path.substring(1).split("/");
    // let newPath: string[] = [];

    // arrayPath.forEach((w: string) => {
    //   if (w.length !== 36) {
    //     newPath.push(w);
    //   }
    // });

    // const permission = `${newPath.join(".")}.${method}`;

    // if (
    //   path === "auth.signup" ||
    //   path === "auth.login" ||
    //   path === "auth.refresh-token"
    // ) {
    //   return next();
    // }

    const access_token = req.headers.authorization;

    if (!access_token) {
      return res.status(401).json({
        success: false,
        errors: {
          error_code: ErrorCode.TOKEN_NOT_PROVIDED,
          error_message: getErrorMessage(ErrorCode.TOKEN_NOT_PROVIDED),
          message: "Token not provided",
        },
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
          return res.status(401).json({
            success: false,
            errors: {
              error_code: ErrorCode.TOKEN_EXPIRED,
              error_message: getErrorMessage(ErrorCode.TOKEN_EXPIRED),
              message: "Token is expired",
            },
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
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          errors: {
            error_code: ErrorCode.NOT_FOUND,
            error_message: getErrorMessage(ErrorCode.NOT_FOUND),
            message: "User not found",
          },
        });
      }

      console.log(permissions);

      if (!permission) {
        // @ts-ignore
        req.user = user;
        return next();
      }

      if (!permissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          errors: {
            error_code: ErrorCode.ACCESS_DENIED,
            error_message: getErrorMessage(ErrorCode.ACCESS_DENIED),
            message: "This account has no permissions",
          },
        });
      }

      // @ts-ignore
      req.user = user;

      return next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        errors: {
          error_code: ErrorCode.TOKEN_INVALID,
          error_message: getErrorMessage(ErrorCode.TOKEN_INVALID),
          message: "Invalid Token",
        },
      });
    }
  };
};

export default authMiddleware;

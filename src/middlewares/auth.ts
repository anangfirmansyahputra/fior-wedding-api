import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.headers.authorization;

  if (!access_token) {
    return res.status(401).json({
      errors: {
        message: "Unauthorized",
      },
    });
  }

  try {
    const payload = jwt.verify(
      access_token,
      process.env.JWT_ACCESS_SECRET_KEY!
    ) as any;

    const user = await prismaClient.user.findFirst({
      where: {
        id: payload.id,
        access_token,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: {
          message: "Unauthorized",
        },
      });
    }

    // @ts-ignore
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      errors: {
        message: "Unauthorized",
      },
    });
  }
};

export default authMiddleware;

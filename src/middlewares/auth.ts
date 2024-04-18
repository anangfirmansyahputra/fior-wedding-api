import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      errors: {
        message: "unauthorized",
      },
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as any;
    const user = await prismaClient.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: {
          message: "unauthorized",
        },
      });
    }

    // @ts-ignore
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      errors: {
        message: "unauthorized",
      },
    });
  }
};

export default authMiddleware;

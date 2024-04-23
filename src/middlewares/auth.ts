import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const path = req.path.substring(1).replace("/", ".");
  const method = req.method.toLowerCase();
  // const permission = `${path}.${method}`;
  const arrayPath = req.path.substring(1).split("/");
  let newPath: string[] = [];

  arrayPath.forEach((w: string) => {
    if (w.length !== 36) {
      newPath.push(w);
    }
  });

  const permission = `${newPath.join(".")}.${method}`;

  if (
    path === "auth.signup" ||
    path === "auth.login"
    // || path === "roles" ||
    // path === "permissions"
  ) {
    return next();
  }

  const access_token = req.headers.authorization;

  if (!access_token) {
    return res.status(401).json({
      errors: {
        message: "Unauthorized",
      },
    });
  }

  try {
    const decodedToken = jwt.decode(access_token, { complete: true });

    if (decodedToken) {
      // @ts-ignore
      const expirationTime = decodedToken.payload.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime >= expirationTime) {
        console.log("Token telah kedaluwarsa");
        return res.status(401).json({
          errors: {
            message: "Token is expired",
          },
        });
      } else {
        // @ts-ignore
        const permissions = decodedToken.payload?.permissions;
        // console.log("Token masih berlaku");

        if (!permissions.includes(permission)) {
          return res.status(403).json({
            errors: {
              message: "This account has no permissions",
            },
          });
        }
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
        role: {
          select: {
            name: true,
            permissions: true,
          },
        },
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

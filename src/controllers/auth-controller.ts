import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { exclude } from "../lib/exclude";
import { loginSchema, refreshTokenSchema, signupSchema } from "../schema/user";

// Login
export const login = async (req: Request, res: Response) => {
  try {
    loginSchema.parse(req.body);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      errors: err?.issues,
    });
  }

  try {
    const { username, password } = req.body;

    let user = await prismaClient.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    if (!compareSync(password, user?.password)) {
      return res.status(401).json({
        errors: {
          message: "Invalid password",
        },
      });
    }

    const access_token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_SECRET_KEY!,
      { expiresIn: "6h" }
    );

    const refresh_token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_SECRET_KEY!,
      { expiresIn: "1d" }
    );

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_token,
        refresh_token,
      },
    });

    return res.status(200).json({
      data: {
        ...exclude(user, ["password"]),
        access_token,
        refresh_token,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    signupSchema.parse(req.body);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      errors: err?.issues,
    });
  }

  try {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({
        errors: {
          message: "Please fill your username address, password and name",
        },
      });
    }

    let user = await prismaClient.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      return res.status(400).json({
        errors: {
          message: "User already exists",
        },
      });
    }

    user = await prismaClient.user.create({
      data: {
        username,
        name,
        password: hashSync(password, 10),
      },
    });

    return res.status(201).json({
      data: exclude(user, ["password"]),
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

// Refresh Token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    refreshTokenSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.issues,
      },
    });
  }

  try {
    const { refresh_token } = req.body;

    const decoded: any = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET_KEY!
    );

    const user = await prismaClient.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: {
          message: "User not found",
        },
      });
    }

    const newToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET_KEY!,
      { expiresIn: "6h" }
    );

    await prismaClient.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        access_token: newToken,
      },
    });

    return res.status(200).json({
      data: {
        access_token: newToken,
      },
    });
  } catch (err) {
    return res.status(401).json({
      errors: {
        message: "Invalid refresh token",
      },
    });
  }
};

// Me
export const me = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  res.status(200).json({
    data: {
      // @ts-ignore
      ...exclude(req.user, ["password", "refresh_token", "access_token"]),
    },
  });
};

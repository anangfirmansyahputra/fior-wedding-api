import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { exclude } from "../lib/exclude";
import { loginSchema, signupSchema } from "../schema/user";

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

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY!
    );

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });

    return res.status(200).json({
      data: {
        ...exclude(user, ["password"]),
        token,
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

// Me
export const me = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  res.json(req.user);
};

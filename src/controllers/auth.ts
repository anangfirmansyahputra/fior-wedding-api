import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { exclude } from "../lib/exclude";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { SignupSchema } from "../schema/user";

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
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

  return res.status(200).json({
    data: {
      ...exclude(user, ["password"]),
      token,
    },
  });
};

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    SignupSchema.parse(req.body);
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        errors: {
          message: "Please fill your email address, password and name",
        },
      });
    }

    let user = await prismaClient.user.findFirst({
      where: {
        email,
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
        email,
        name,
        password: hashSync(password, 10),
      },
    });

    return res.status(201).json({
      data: user,
    });
  } catch (err: any) {
    return res.status(422).json({
      errors: {
        message: err?.issues,
      },
    });
  }
};

// Me
export const me = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  res.json(req.user);
};

import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { excludeField } from "../lib/exclude";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
  updateUserSchema,
} from "../schema/user";
import { ErrorCode, getErrorMessage } from "../lib/error-code";

// Login
export const login = async (req: Request, res: Response) => {
  try {
    loginSchema.parse(req.body);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.issues,
      },
    });
  }

  try {
    const { username, password } = req.body;

    let user = await prismaClient.user.findFirst({
      where: {
        username,
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
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "User not found",
        },
      });
    }

    if (!compareSync(password, user?.password)) {
      return res.status(401).json({
        success: false,
        errors: {
          error_code: ErrorCode.PASSWORD_INCORRECT,
          error_message: getErrorMessage(ErrorCode.PASSWORD_INCORRECT),
          message: "Invalid password",
        },
      });
    }

    const permissions = await prismaClient.rolePermission.findMany({
      where: {
        role_id: user.role_id,
      },
      include: {
        permission: {
          select: {
            name_code: true,
          },
        },
      },
    });

    const formatToken = permissions.map(
      (permission) => permission.permission.name_code
    );

    const access_token = jwt.sign(
      {
        id: user.id,
        permissions: formatToken,
      },
      process.env.JWT_ACCESS_SECRET_KEY!,
      { expiresIn: "7d" }
    );

    const refresh_token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_SECRET_KEY!
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

    const data = {
      ...user,
      role: user.role.name,
    };

    return res.status(200).json({
      // @ts-ignore
      success: true,
      data: {
        ...excludeField(data, ["password", "role_id"]),
        access_token,
        refresh_token,
      },
      message: "Login successful",
    });
  } catch (err: any) {
    console.log(err);

    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.message,
      },
    });
  }
};

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    signupSchema.parse(req.body);

    const role = await prismaClient.role.findFirst({
      where: {
        id: req.body.role_id,
      },
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Role not found",
        },
      });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.issues,
      },
    });
  }

  try {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
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
        success: false,
        errors: {
          error_code: ErrorCode.FAILED_CREATE,
          error_message: getErrorMessage(ErrorCode.FAILED_CREATE),
          message: "User alredy exists",
        },
      });
    }

    const role = await prismaClient.role.findFirst({
      where: {
        name: "CUSTOMER",
      },
    });

    user = await prismaClient.user.create({
      data: {
        username,
        name,
        password: hashSync(password, 10),
        role_id: req.body.role_id ?? role?.id,
      },
    });

    return res.status(201).json({
      success: true,
      data: excludeField(user, ["password"]),
      message: "User create successfully",
    });
  } catch (err: any) {
    console.log(err);

    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.FAILED_CREATE,
        error_message: getErrorMessage(ErrorCode.FAILED_CREATE),
        message: err?.message,
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
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
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
        refresh_token,
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
        success: false,
        errors: {
          error_code: ErrorCode.TOKEN_INVALID,
          error_message: getErrorMessage(ErrorCode.TOKEN_INVALID),
          message: "Refresh token is invalid",
        },
      });
    }

    const newToken = jwt.sign(
      { id: user.id, permissions: user.role.permissions },
      process.env.JWT_ACCESS_SECRET_KEY!,
      { expiresIn: "7d" }
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
      success: true,
      data: {
        access_token: newToken,
      },
      message: "Refresh token successfully",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.message,
      },
    });
  }
};

// Me
export const me = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const data = {
    // @ts-ignore
    ...req.user,
    // @ts-ignore
    role: req.user.role.name,
  };

  res.status(200).json({
    success: true,
    data:
      // @ts-ignore
      excludeField(data, ["password", "refresh_token", "access_token"]),
    message: "Get user profile success",
  });
};

// Update
export const update = async (req: Request, res: Response) => {
  try {
    updateUserSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.NOT_FOUND,
        error_message: getErrorMessage(ErrorCode.NOT_FOUND),
        message: err?.issues,
      },
    });
  }

  try {
    const { name, password } = req.body;

    const data = {} as any;

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = hashSync(password, 10);
    }

    const user = await prismaClient.user.update({
      where: {
        // @ts-ignore
        id: req.user.id,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      data: excludeField(user, ["password", "access_token", "refresh_token"]),
      message: "User update successfully",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.message,
      },
    });
  }
};

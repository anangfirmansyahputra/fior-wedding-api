import { Response, Request } from "express";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { prismaClient } from "../index";
import { Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "Name is required",
        },
      });
    }

    if (!req.body.name_code) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "Name code is required",
        },
      });
    }

    const permission = await prismaClient.permission.create({
      data: {
        name: req.body.name,
        name_code: req.body.name_code,
      },
    });

    return res.status(201).json({
      success: true,
      data: permission,
      message: "Permission created successfully",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e.meta);
        return res.status(400).json({
          success: false,
          errors: {
            error_code: ErrorCode.INVALID_INPUT,
            error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
            message: e.message,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: "Internal server error",
        },
      });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const permissons = await prismaClient.permission.findMany({
      orderBy: {
        name_code: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      data: permissons,
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      errors: {
        error_code: ErrorCode.INTERNAL_SERVER_ERROR,
        error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
        message: "Internal server error",
      },
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "Name is required",
        },
      });
    }

    if (!req.body.name_code) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "Name code is required",
        },
      });
    }

    const permission = await prismaClient.permission.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!permission) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Permission not found",
        },
      });
    }

    const updatedPermission = await prismaClient.permission.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        name_code: req.body.name_code,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedPermission,
      message: "Permission updated successfully",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e.meta);
        return res.status(400).json({
          success: false,
          errors: {
            error_code: ErrorCode.INVALID_INPUT,
            error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
            message: e.message,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: "Internal server error",
        },
      });
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const permission = await prismaClient.permission.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!permission) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Permission not found",
        },
      });
    }

    await prismaClient.permission.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        return res.status(400).json({
          success: false,
          errors: {
            error_code: ErrorCode.FAILED_DELETE,
            error_message: getErrorMessage(ErrorCode.FAILED_DELETE),
            message: e.message,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: "Internal server error",
        },
      });
    }
  }
};

import { Request, Response } from "express";
import { prismaClient } from "../index";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const { user_id, colaborations } = req.body as {
      user_id: string;
      colaborations: string[];
    };

    if (!colaborations || colaborations.length === 0) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message:
            "Colaborations is required and must contain at least 1 colaborator id",
        },
      });
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
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

    const data = await prismaClient.colaboration.createMany({
      data: colaborations.map((colaboration) => ({
        colaborator_id: colaboration,
        user_id,
      })),
    });

    return res.status(201).json({
      success: true,
      data,
      message: "Colaborations created successfully",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e.name);
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

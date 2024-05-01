import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { prismaClient } from "../index";
import { errorResponse } from "../exceptions/error";

export const create = async (req: Request, res: Response) => {
  try {
    const { note } = req.body as {
      note: string;
    };

    if (!note) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "Please enter a note",
        },
      });
    }

    const vendor = await prismaClient.vendor.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Vendor not found",
        },
      });
    }

    const noted = await prismaClient.vendorNote.create({
      data: {
        // @ts-ignore
        user_id: req.user.id,
        vendor_id: Number(req.params.id),
        note,
      },
    });

    return res.status(201).json({
      success: true,
      data: noted,
      message: "Vendor Note created successfully",
    });
  } catch (e: any) {
    console.log(e);

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

export const get = async (req: Request, res: Response) => {
  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Vendor Note not found",
        },
      });
    }

    const notes = await prismaClient.vendorNote.findMany({
      where: {
        vendor_id: Number(req.params.id),
      },
    });

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Vendor Note not found",
        },
      });
    }

    const note = await prismaClient.vendorNote.findFirst({
      where: {
        id: req.params.note_id,
      },
    });

    if (!note) {
      return errorResponse({
        res,
        type: "not found",
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Vendor Note not found",
        },
      });
    }

    const note = await prismaClient.vendorNote.findFirst({
      where: {
        id: req.params.note_id,
      },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Vendor Note not found",
        },
      });
    }

    const updateNote = await prismaClient.vendorNote.update({
      where: {
        id: req.params.note_id,
      },
      data: {
        note: req.body.note,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateNote,
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

export const remove = async (req: Request, res: Response) => {
  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Vendor Note not found",
        },
      });
    }

    const note = await prismaClient.vendorNote.findFirst({
      where: {
        id: req.params.note_id,
        // @ts-ignore
        user_id: req.user.id,
      },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Vendor Note not found",
        },
      });
    }

    await prismaClient.vendorNote.delete({
      where: {
        id: req.params.note_id,
      },
    });

    return res.status(204).json({});
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

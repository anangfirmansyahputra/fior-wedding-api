import { Request, Response } from "express";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { prismaClient } from "../index";
import { Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Please provide a valid event",
        },
      });
    }

    if (!req.body.name) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "Please enter a name",
        },
      });
    }

    const checklistHolmat = await prismaClient.checklistHolmat.create({
      data: {
        name: req.body.name,
        event_id: req.params.event_id,
      },
    });

    return res.status(201).json({
      success: true,
      data: checklistHolmat,
      message: "ChecklistHolmat created successfully",
    });
  } catch (e: any) {
    console.log(e.code);

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
    const checklistHolmats = await prismaClient.checklistHolmat.findMany({
      include: {
        checklist_holmat_items: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: checklistHolmats,
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

export const find = async (req: Request, res: Response) => {
  try {
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.RESOURCE_NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.RESOURCE_NOT_FOUND),
          message: "Event not found",
        },
      });
    }

    const checklistHolmat = await prismaClient.checklistHolmat.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        checklist_holmat_items: true,
      },
    });

    if (!checklistHolmat) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.RESOURCE_NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.RESOURCE_NOT_FOUND),
          message: "ChecklistHolmat not found",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: checklistHolmat,
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
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.RESOURCE_NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.RESOURCE_NOT_FOUND),
          message: "Event not found",
        },
      });
    }

    const checklistHolmat = await prismaClient.checklistHolmat.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!checklistHolmat) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.RESOURCE_NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.RESOURCE_NOT_FOUND),
          message: "ChecklistHolmat not found",
        },
      });
    }

    const newChecklistHolmat = await prismaClient.checklistHolmat.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    });

    return res.status(200).json({
      success: true,
      data: newChecklistHolmat,
      message: "Checklist holmat updated success",
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
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.RESOURCE_NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.RESOURCE_NOT_FOUND),
          message: "Event not found",
        },
      });
    }

    const checklistHolmat = await prismaClient.checklistHolmat.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!checklistHolmat) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.RESOURCE_NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.RESOURCE_NOT_FOUND),
          message: "ChecklistHolmat not found",
        },
      });
    }

    await prismaClient.checklistHolmat.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
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

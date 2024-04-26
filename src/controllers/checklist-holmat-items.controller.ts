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

    const checklistHolmat = await prismaClient.checklistHolmat.findFirst({
      where: {
        id: req.params.checklist_id,
      },
    });

    if (!checklistHolmat) {
      return res.status(404).json({
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Please provide a valid checklist holmat id",
        },
      });
    }

    if (!req.body.description) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "Please enter a description",
        },
      });
    }

    const checklistHolmatItem = await prismaClient.checklistHolmatItem.create({
      data: {
        description: req.body.description,
        checklist_holmat_id: req.params.checklist_id,
        note: req.body.note,
      },
    });

    return res.status(201).json({
      success: true,
      data: checklistHolmatItem,
      message: "Checklist holmat item created successfully",
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

export const get = async (req: Request, res: Response) => {
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

    const checklistHolmat = await prismaClient.checklistHolmat.findFirst({
      where: {
        id: req.params.checklist_id,
      },
    });

    if (!checklistHolmat) {
      return res.status(404).json({
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Please provide a valid checklist holmat id",
        },
      });
    }

    const checklistHolmatItem =
      await prismaClient.checklistHolmatItem.findFirst({
        where: {
          id: req.params.id,
        },
      });

    if (!checklistHolmatItem) {
      return res.status(404).json({
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Checklist holmat item not found",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: checklistHolmatItem,
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
        id: req.params.checklist_id,
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
          message: "Checklist holmat not found",
        },
      });
    }

    const checklistHolmatItem =
      await prismaClient.checklistHolmatItem.findFirst({
        where: {
          id: req.params.id,
        },
      });

    if (!checklistHolmatItem) {
      return res.status(404).json({
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Checklist holmat item not found",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: checklistHolmatItem,
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
        id: req.params.checklist_id,
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

    const checklistHolmatItem =
      await prismaClient.checklistHolmatItem.findFirst({
        where: {
          id: req.params.id,
        },
      });

    if (!checklistHolmatItem) {
      return res.status(404).json({
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Checklist holmat item not found",
        },
      });
    }

    const newChecklistHolmatItem =
      await prismaClient.checklistHolmatItem.update({
        where: {
          id: req.params.id,
        },
        data: {
          description: req.body.description,
          note: req.body.note,
        },
      });

    return res.status(200).json({
      success: true,
      data: newChecklistHolmatItem,
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
        id: req.params.checklist_id,
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

    const checklistHolmatItem =
      await prismaClient.checklistHolmatItem.findFirst({
        where: {
          id: req.params.id,
        },
      });

    if (!checklistHolmatItem) {
      return res.status(404).json({
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Checklist holmat item not found",
        },
      });
    }

    await prismaClient.checklistHolmatItem.delete({
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

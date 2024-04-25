import { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { eventSchema } from "../schema/event";
import { Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    eventSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_mesage: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.issues,
      },
    });
  }

  try {
    const event = await prismaClient.event.create({
      data: {
        client_name: req.body.client_name,
        estimate_guest: req.body.estimate_guest,
        guest_arrival: req.body.guest_arrival,
        guest_departure: req.body.guest_departure,
        venue_address: req.body.venue_address,
        venue_name: req.body.venue_name,
        archive: req.body.archive,
      },
    });

    return res.status(201).json({
      success: true,
      data: event,
      message: "Event create successfully",
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
    // @ts-ignore
    const isAdmin = req.user.role.name === "Super Admin";

    const events = await prismaClient.event.findMany({
      // @ts-ignore
      where: isAdmin ? {} : { customer_id: req.user.id },
      include: {
        event_vendor: {
          include: {
            vendor: true,
          },
        },
        event_payment: true,
        event_guest_seat: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    console.log(err);

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
    // @ts-ignore
    const isAdmin = req.user.role.name === "Super Admin";

    const event = await prismaClient.event.findFirst({
      where: isAdmin
        ? {
            id: req.params.id,
          }
        : {
            id: req.params.id,
            // @ts-ignore
            customer_id: req.user.id,
          },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Event not found",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err: any) {
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
    eventSchema.parse(req.body);
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
    // @ts-ignore
    const isAdmin = req.user.role.name === "Super Admin";

    const event = await prismaClient.event.findFirst({
      where: isAdmin
        ? {
            id: req.params.id,
          }
        : {
            id: req.params.id,
            // @ts-ignore
            customer_id: req.user.id,
          },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Event not found",
        },
      });
    }

    const updateEvent = await prismaClient.event.update({
      where: {
        id: req.params.id,
      },
      data: {
        client_name: req.body.client_name,
        estimate_guest: req.body.estimate_guest,
        guest_arrival: req.body.guest_arrival,
        guest_departure: req.body.guest_departure,
        venue_address: req.body.venue_address,
        venue_name: req.body.venue_name,
        archive: req.body.archive,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateEvent,
      message: "Event updated successfully",
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

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const isAdmin = req.user.role.name === "Super Admin";

    const event = await prismaClient.event.findFirst({
      where: isAdmin
        ? {
            id: req.params.id,
          }
        : {
            id: req.params.id,
            // @ts-ignore
            customer_id: req.user.id,
          },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: "Event not found",
        },
      });
    }

    await prismaClient.event.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (err) {
    console.log(err);
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

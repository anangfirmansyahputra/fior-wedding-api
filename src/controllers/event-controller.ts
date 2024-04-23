import { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { eventSchema, eventUpdateSchema } from "../schema/event";

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
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.body.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_mesage: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer not found",
        },
      });
    }

    const event = await prismaClient.event.create({
      data: {
        customer_id: req.body.customer_id,
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
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      success: false,
      errors: {
        error_code: ErrorCode.INTERNAL_SERVER_ERROR,
        error_mesage: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
        message: "Internal server error",
      },
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const events = await prismaClient.event.findMany({
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
        id: req.params.id,
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
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.id,
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
        customer_id: req.body.customer_id,
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

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.id,
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

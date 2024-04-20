import { Request, Response } from "express";
import {
  eventPaymentCreateSchema,
  eventPaymentUpdateSchema,
} from "../schema/event-payment";
import { prismaClient } from "..";

export const create = async (req: Request, res: Response) => {
  try {
    eventPaymentCreateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.issues,
      },
    });
  }

  try {
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.body.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    const eventPayment = await prismaClient.eventPayment.create({
      data: req.body,
    });

    return res.status(201).json({
      data: eventPayment,
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const eventPayments = await prismaClient.eventPayment.findMany({});

    return res.status(200).json({
      data: eventPayments,
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const eventPayment = await prismaClient.eventPayment.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!eventPayment) {
      return res.status(404).json({
        errors: {
          message: "Event payment not found",
        },
      });
    }

    return res.status(200).json({
      data: eventPayment,
    });
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    eventPaymentUpdateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.issues,
      },
    });
  }

  try {
    const findEventPayment = await prismaClient.eventPayment.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!findEventPayment) {
      return res.status(404).json({
        errors: {
          message: "Event payment not found",
        },
      });
    }

    const eventPayment = await prismaClient.eventPayment.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    return res.status(200).json({
      data: eventPayment,
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

export const deleteEventPayment = async (req: Request, res: Response) => {
  try {
    const eventPayment = await prismaClient.eventPayment.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!eventPayment) {
      return res.status(404).json({
        errors: {
          message: "Event payment not found",
        },
      });
    }

    await prismaClient.eventPayment.delete({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

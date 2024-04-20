import { Request, Response } from "express";
import { eventCreateSchema, eventUpdateSchema } from "../schema/event";
import { prismaClient } from "..";

export const create = async (req: Request, res: Response) => {
  try {
    eventCreateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: err?.issues,
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
        errors: {
          message: "Customer not found",
        },
      });
    }

    const event = await prismaClient.event.create({
      data: req.body,
    });

    return res.status(201).json({
      data: event,
    });
  } catch (err: any) {
    console.log(err);

    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const events = await prismaClient.event.findMany();

    return res.status(200).json({
      data: events,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: {
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
        errors: {
          message: "Event not found",
        },
      });
    }

    return res.status(200).json({
      data: event,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    eventUpdateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: err?.issues,
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
        errors: {
          message: "Event not found",
        },
      });
    }

    const { customer_id, ...payload } = req.body;

    const updateEvent = await prismaClient.event.update({
      where: {
        id: req.params.id,
      },
      data: payload,
    });

    return res.status(200).json({
      data: updateEvent,
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.message,
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
        errors: {
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
      errors: {
        message: "Internal server error",
      },
    });
  }
};

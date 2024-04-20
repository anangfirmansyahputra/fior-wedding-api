import { Request, Response } from "express";
import {
  eventGuestSeatCreateSchema,
  eventGuestSeatUpdateSchema,
} from "../schema/event-guest-seat";
import { prismaClient } from "..";

export const create = async (req: Request, res: Response) => {
  try {
    eventGuestSeatCreateSchema.parse(req.body);
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
      return res.status(400).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    const eventGuestSeat = await prismaClient.eventGuestSeat.create({
      data: req.body,
    });

    return res.status(201).json({
      data: eventGuestSeat,
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
    const eventGuestSeats = await prismaClient.eventGuestSeat.findMany({});

    return res.status(200).json({
      data: eventGuestSeats,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const eventGuestSeat = await prismaClient.eventGuestSeat.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!eventGuestSeat) {
      return res.status(404).json({
        errors: {
          message: "Event guest seat not found",
        },
      });
    }

    return res.status(200).json({
      data: eventGuestSeat,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    eventGuestSeatUpdateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.issues,
      },
    });
  }

  try {
    const findData = await prismaClient.eventGuestSeat.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!findData) {
      return res.status(404).json({
        errors: {
          message: "Event guest seat not found",
        },
      });
    }

    const updateData = await prismaClient.eventGuestSeat.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    return res.status(200).json({
      data: updateData,
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const findData = await prismaClient.eventGuestSeat.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!findData) {
      return res.status(404).json({
        errors: {
          message: "Event guest seat not found",
        },
      });
    }

    await prismaClient.eventGuestSeat.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

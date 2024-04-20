import { Request, Response } from "express";
import {
  eventRundownCreateSchema,
  eventRundownUpdateSchema,
} from "../schema/event-rundown";
import { prismaClient } from "..";

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
          message: "Event not found",
        },
      });
    }

    const data = await prismaClient.eventRundown.findMany({
      where: {
        event_id: req.params.event_id,
      },
    });

    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    eventRundownCreateSchema.parse(req.body);
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

    const data = await prismaClient.eventRundown.create({
      data: {
        event_id: req.params.event_id,
        ...req.body,
      },
    });

    return res.status(201).json({
      data,
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
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    const data = await prismaClient.eventRundown.findFirst({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
      },
    });

    if (!data) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    return res.status(200).json({
      data,
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
    eventRundownUpdateSchema.parse(req.body);
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
        id: req.params.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    const data = await prismaClient.eventRundown.findFirst({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
      },
    });

    if (!data) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    const { event_id, ...payload } = req.body;

    const newData = await prismaClient.eventRundown.update({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
      },
      data: payload,
    });

    return res.status(200).json({
      data: newData,
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
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    const data = await prismaClient.eventRundown.findFirst({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
      },
    });

    if (!data) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    await prismaClient.eventRundown.delete({
      where: {
        id: req.params.id,
        event_id: req.params.event_id,
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

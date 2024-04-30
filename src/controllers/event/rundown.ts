import { Request, Response } from "express";
import { eventRundownSchema } from "../../schema/event/rundown";
import { prismaClient } from "../../index";
import { errorResponse } from "../../exceptions/error";
import { EventCollaborator, Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Event not found",
      });
    }

    eventRundownSchema.parse(req.body);
  } catch (err: any) {
    return errorResponse({ res, type: "invalid", message: err?.issues });
  }

  try {
    const rundown = await prismaClient.eventRundown.create({
      data: {
        event_id: req.params.event_id,
        rundown_date: req.body.rundown_date,
        rundown_end_datetime: req.body.rundown_end_datetime,
        rundown_location: req.body.rundown_location,
        rundown_name: req.body.rundown_name,
        rundown_notes: req.body.rundown_notes,
        rundown_start_datetime: req.body.rundown_start_datetime,
      },
    });

    return res.status(201).json({
      success: true,
      data: rundown,
      message: "Rundown created successfully",
    });
  } catch (e) {
    console.log(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return errorResponse({ res, type: "invalid", message: e.message });
      }
    } else {
      return errorResponse({ res, type: "internal error" });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    let rundowns;
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.params.event_id,
      },
    });

    if (!event) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event not found",
      });
    }

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (colaborator) => colaborator.event_id === req.params.event_id
    );

    const isAdmin = req.user.role.name === "Super Admin";

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    if (isAdmin) {
      rundowns = await prismaClient.eventRundown.findMany({});
    } else {
      rundowns = await prismaClient.eventRundown.findMany({
        where: {
          event_id: req.params.event_id,
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: rundowns,
    });
  } catch (e: any) {
    console.log(e);
    return errorResponse({ res, type: "internal error" });
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
      return errorResponse({
        res,
        type: "not found",
        message: "Event not found",
      });
    }

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (colaborator) => colaborator.event_id === req.params.event_id
    );

    const isAdmin = req.user.role.name === "Super Admin";

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    const rundown = await prismaClient.eventRundown.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!rundown) {
      return errorResponse({
        res,
        type: "not found",
        message: "Rundown not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rundown,
    });
  } catch (e: any) {
    console.log(e);
    return errorResponse({ res, type: "internal error" });
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
      return errorResponse({
        res,
        type: "not found",
        message: "Event not found",
      });
    }

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (colaborator) => colaborator.event_id === req.params.event_id
    );

    const isAdmin = req.user.role.name === "Super Admin";

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    const rundown = await prismaClient.eventRundown.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!rundown) {
      return errorResponse({
        res,
        type: "not found",
        message: "Rundown not found",
      });
    }

    const updateRundown = await prismaClient.eventRundown.update({
      where: {
        id: req.params.id,
      },
      data: {
        event_id: req.params.event_id,
        rundown_date: req.body.rundown_date,
        rundown_end_datetime: req.body.rundown_end_datetime,
        rundown_location: req.body.rundown_location,
        rundown_name: req.body.rundown_name,
        rundown_notes: req.body.rundown_notes,
        rundown_start_datetime: req.body.rundown_start_datetime,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateRundown,
      message: "Event rundown updated successfully",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return errorResponse({ res, type: "invalid", message: e.message });
      }
    } else {
      return errorResponse({ res, type: "internal error" });
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
      return errorResponse({
        res,
        type: "not found",
        message: "Event not found",
      });
    }

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (colaborator) => colaborator.event_id === req.params.event_id
    );

    const isAdmin = req.user.role.name === "Super Admin";

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    const rundown = await prismaClient.eventRundown.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!rundown) {
      return errorResponse({
        res,
        type: "not found",
        message: "Rundown not found",
      });
    }

    await prismaClient.eventRundown.delete({
      where: {
        id: req.params.id,
      },
    });
    return res.status(204).json({});
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return errorResponse({ res, type: "invalid", message: e.message });
      }
    } else {
      return errorResponse({ res, type: "internal error" });
    }
  }
};

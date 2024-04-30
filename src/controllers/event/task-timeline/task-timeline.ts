import { Request, Response } from "express";
import { eventRundownSchema } from "../../../schema/event/rundown";
import { prismaClient } from "../../../index";
import { errorResponse } from "../../../exceptions/error";
import { EventCollaborator, Prisma } from "@prisma/client";
import { taskTimelineSchema } from "../../../schema/event/task-timeline";

export const create = async (req: Request, res: Response) => {
  try {
    const eventVendor = await prismaClient.eventVendor.findFirst({
      where: {
        id: req.body.event_vendor_id,
      },
    });

    if (!eventVendor) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Event vendor not found",
      });
    }

    const user = await prismaClient.user.findMany({
      where: {
        OR: req.body.users.map((user: string) => ({
          id: user,
        })),
      },
    });

    if (req.body.users.length === 0) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Please insert at least 1 user id",
      });
    }

    for (const id of req.body.users) {
      const user = await prismaClient.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        return errorResponse({
          res,
          type: "invalid",
          message: "User not found",
        });
      }
    }

    taskTimelineSchema.parse(req.body);
  } catch (err: any) {
    return errorResponse({ res, type: "invalid", message: err?.issues });
  }

  try {
    const taskTimeline = await prismaClient.eventTaskTimeline.create({
      data: {
        event_id: req.params.event_id,
        category: req.body.category,
        due_date: req.body.due_date,
        event_vendor_id: req.body.event_vendor_id,
        start_date: req.body.start_date,
        task_name: req.body.task_name,
        notes: req.body.notes,
        order_nr: req.body.order_nr,
        status: req.body.status,
        task_description: req.body.task_description,
      },
      include: {
        assignee: true,
      },
    });

    await prismaClient.assignee.createMany({
      data: req.body.users.map((user: string) => ({
        user_id: user,
        event_task_timeline_id: taskTimeline.id,
      })),
    });

    const data = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: taskTimeline.id,
      },
      include: {
        assignee: true,
      },
    });

    return res.status(201).json({
      success: true,
      data,
      message: "Event task list created successfully",
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
    const taskTimelines = await prismaClient.eventTaskTimeline.findMany({
      where: {
        event_id: req.params.event_id,
      },
      include: {
        assignee: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: taskTimelines,
    });
  } catch (e: any) {
    console.log(e);
    return errorResponse({ res, type: "internal error" });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        assignee: true,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: taskTimeline,
    });
  } catch (e: any) {
    console.log(e);
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const eventVendor = await prismaClient.eventVendor.findFirst({
      where: {
        id: req.body.event_vendor_id,
      },
    });

    if (!eventVendor) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Event vendor not found",
      });
    }

    const user = await prismaClient.user.findMany({
      where: {
        OR: req.body.users.map((user: string) => ({
          id: user,
        })),
      },
    });

    if (req.body.users.length === 0) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Please insert at least 1 user id",
      });
    }

    for (const id of req.body.users) {
      const user = await prismaClient.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        return errorResponse({
          res,
          type: "invalid",
          message: "User not found",
        });
      }
    }

    taskTimelineSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const eventCollaborators: EventCollaborator[] =
      // @ts-ignore
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (colaborator) => colaborator.event_id === req.params.event_id
    );

    // @ts-ignore
    const isAdmin = req.user.role.name === "Super Admin";

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    const updateTaskTimeline = await prismaClient.eventTaskTimeline.update({
      where: {
        id: req.params.id,
      },
      data: {
        event_id: req.params.event_id,
        category: req.body.category,
        due_date: req.body.due_date,
        event_vendor_id: req.body.event_vendor_id,
        start_date: req.body.start_date,
        task_name: req.body.task_name,
        notes: req.body.notes,
        order_nr: req.body.order_nr,
        status: req.body.status,
        task_description: req.body.task_description,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateTaskTimeline,
      message: "Event task timeline updated successfully",
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
    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    await prismaClient.eventTaskTimeline.delete({
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

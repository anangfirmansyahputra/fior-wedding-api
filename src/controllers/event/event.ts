import { Request, Response } from "express";
import { prismaClient } from "../..";
import { ErrorCode, getErrorMessage } from "../../lib/error-code";
import { eventSchema } from "../../schema/event";
import { EventCollaborator, Prisma } from "@prisma/client";
import { errorResponse } from "../../exceptions/error";
import { createPagination } from "../../lib/utils";

export const create = async (req: Request, res: Response) => {
  try {
    eventSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
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
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const name = (req.query.name as string) || "";

    let events;
    let totalCount;
    const isAdmin = req.user.role.name === "Super Admin";

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    if (isAdmin) {
      events = await prismaClient.event.findMany({
        skip: offset,
        take: pageSize,
        where: name
          ? {
              client_name: {
                contains: name,
              },
            }
          : {},
      });

      totalCount = await prismaClient.event.count({});
    } else {
      events = await prismaClient.event.findMany({
        where: name
          ? {
              OR: eventCollaborators.map((collaborator) => ({
                id: collaborator.event_id,
              })),
              client_name: {
                contains: name,
              },
            }
          : {
              OR: eventCollaborators.map((collaborator) => ({
                id: collaborator.event_id,
              })),
            },
        skip: offset,
        take: pageSize,
      });
      totalCount = await prismaClient.event.count({
        where: {
          OR: eventCollaborators.map((collaborator) => ({
            id: collaborator.event_id,
          })),
        },
      });
    }

    const { next_page, previous_age, current_page, total } = createPagination(
      page,
      pageSize,
      totalCount
    );

    return res.status(200).json({
      success: true,
      data: events,
      page_info: {
        next_page: events.length === 0 ? null : next_page,
        previous_page: events.length === 0 ? null : previous_age,
        current_page,
        total,
      },
    });
  } catch (err) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user.role.name === "Super Admin";

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (collaborator) => collaborator.event_id === req.params.id
    );

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    if (isAdmin || isCollaborator) {
      const event = await prismaClient.event.findFirst({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        success: true,
        data: event,
      });
    }
  } catch (err) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    eventSchema.parse(req.body);
  } catch (err: any) {
    return errorResponse({ res, type: "invalid", message: err?.issues });
  }

  try {
    const isAdmin = req.user.role.name === "Super Admin";

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (collaborator) => collaborator.event_id === req.params.id
    );

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    if (isAdmin || isCollaborator) {
      const event = await prismaClient.event.findFirst({
        where: {
          id: req.params.id,
        },
      });

      if (!event) {
        return errorResponse({
          res,
          type: "not found",
          message: "Event not found",
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
        message: "Event successfully updated",
      });
    }
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

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user.role.name === "Super Admin";

    const eventCollaborators: EventCollaborator[] =
      req.user.event_collaborators;

    const isCollaborator = eventCollaborators.find(
      (collaborator) => collaborator.event_id === req.params.id
    );

    if (!isCollaborator && !isAdmin) {
      return errorResponse({
        res,
        type: "no permissions",
        message: "You dont have permission to this data",
      });
    }

    if (isAdmin || isCollaborator) {
      const event = await prismaClient.event.findFirst({
        where: {
          id: req.params.id,
        },
      });

      if (!event) {
        return errorResponse({
          res,
          type: "not found",
          message: "Event not found",
        });
      }

      await prismaClient.event.delete({
        where: {
          id: req.params.id,
        },
      });

      return res.status(204).json({});
    }
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

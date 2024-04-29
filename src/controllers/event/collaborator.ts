import { Request, Response } from "express";
import { errorResponse } from "../../exceptions/error";
import { prismaClient } from "../../index";
import { Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

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

    if (!user_id) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Please insert an user ID.",
      });
    }

    const eventCollaborator = await prismaClient.eventCollaborator.create({
      data: {
        event_id: req.params.event_id,
        user_id,
      },
    });

    return res.status(200).json({
      success: true,
      data: eventCollaborator,
      message: "Event collaborator created successfully",
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

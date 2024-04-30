import { Request, Response } from "express";
import { errorResponse } from "../../exceptions/error";
import { prismaClient } from "../../index";
import { Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    const { users } = req.body;

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

    if (!users || users.length === 0) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Please insert at least one user id.",
      });
    }

    for (const user of users) {
      const findUser = await prismaClient.user.findFirst({
        where: {
          id: user,
        },
      });

      if (!findUser) {
        return errorResponse({
          res,
          type: "not found",
          message: "User not found",
        });
      }
    }

    await prismaClient.eventCollaborator.createMany({
      data: users.map((user: string) => ({
        event_id: req.params.event_id,
        user_id: user,
      })),
    });

    return res.status(200).json({
      success: true,
      data: null,
      message: "Event collaborator created successfully",
    });
  } catch (e: any) {
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

import { Request, Response } from "express";
import { prismaClient } from "../../index";
import { errorResponse } from "../../exceptions/error";
import { EventCollaborator, Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.title) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Title is required",
      });
    }

    const holmat = await prismaClient.eventHolmat.create({
      data: {
        event_id: req.params.event_id,
        title: req.body.title,
      },
    });

    return res.status(201).json({
      success: true,
      data: holmat,
      message: "Event holmat created successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const holmats = await prismaClient.eventHolmat.findMany({
      where: {
        event_id: req.params.event_id,
      },
      include: {
        event_holmat_checklist: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: holmats,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const holmat = await prismaClient.eventHolmat.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        event_holmat_checklist: true,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: holmat,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const holmat = await prismaClient.eventHolmat.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    const data = await prismaClient.eventHolmat.update({
      where: {
        id: req.params.id,
      },
      data: {
        event_id: req.params.event_id,
        title: req.body.title,
      },
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const holmat = await prismaClient.eventHolmat.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    await prismaClient.eventHolmat.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

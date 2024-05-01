import { Request, Response } from "express";
import { prismaClient } from "../../index";
import { errorResponse } from "../../exceptions/error";
import { EventCollaborator, Prisma } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.description) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Description is required",
      });
    }

    const holmat = await prismaClient.eventHolmat.findFirst({
      where: {
        id: req.params.holmat_id,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    const checklist = await prismaClient.eventHolmatChecklist.create({
      data: {
        event_holmat_id: holmat.id,
        description: req.body.description,
        notes: req.body.notes,
      },
    });

    return res.status(201).json({
      success: true,
      data: checklist,
      message: "Event holmat list created successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const holmat = await prismaClient.eventHolmat.findFirst({
      where: {
        id: req.params.holmat_id,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    const checklists = await prismaClient.eventHolmatChecklist.findMany({
      where: {
        event_holmat_id: holmat.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: checklists,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const holmat = await prismaClient.eventHolmat.findFirst({
      where: {
        id: req.params.holmat_id,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    const checklist = await prismaClient.eventHolmatChecklist.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!checklist) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat checklist not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: checklist,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const holmat = await prismaClient.eventHolmat.findFirst({
      where: {
        id: req.params.holmat_id,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    const checklist = await prismaClient.eventHolmatChecklist.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!checklist) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat checklist not found",
      });
    }

    const data = await prismaClient.eventHolmatChecklist.update({
      where: {
        id: req.params.id,
      },
      data: {
        event_holmat_id: holmat.id,
        description: req.body.description,
        notes: req.body.notes,
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
        id: req.params.holmat_id,
      },
    });

    if (!holmat) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat not found",
      });
    }

    const checklist = await prismaClient.eventHolmatChecklist.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!checklist) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event holmat checklist not found",
      });
    }

    await prismaClient.eventHolmatChecklist.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }
};

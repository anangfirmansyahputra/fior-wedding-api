import { Request, Response } from "express";
import { prismaClient } from "../../..";
import { errorResponse } from "../../../exceptions/error";
import multer from "multer";

export const create = async (req: Request, res: Response) => {
  try {
    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.task_timeline_id,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    if (!req.file) {
      return errorResponse({
        res,
        type: "invalid",
        message: "File is required",
      });
    }

    const attachment = await prismaClient.eventTimelineAttachment.create({
      data: {
        event_task_timeline_id: req.params.task_timeline_id,
        filename: req.file.filename,
      },
    });

    return res.status(201).json({
      success: true,
      data: attachment,
      message: "Event task timeline attachment created successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error", message: e?.message });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.task_timeline_id,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    const attachment = await prismaClient.eventTimelineAttachment.findMany({
      where: {
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    return res.status(200).json({
      success: true,
      data: attachment,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.task_timeline_id,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    const attachment = await prismaClient.eventTimelineAttachment.findFirst({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    if (!attachment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline attachment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attachment,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.task_timeline_id,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    const attachment = await prismaClient.eventTimelineAttachment.findFirst({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    if (!attachment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline attachment not found",
      });
    }

    if (!req.file) {
      return errorResponse({
        res,
        type: "invalid",
        message: "File is required",
      });
    }

    const updateAttachment = await prismaClient.eventTimelineAttachment.update({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
      data: {
        filename: req.file.filename,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateAttachment,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const taskTimeline = await prismaClient.eventTaskTimeline.findFirst({
      where: {
        id: req.params.task_timeline_id,
      },
    });

    if (!taskTimeline) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline not found",
      });
    }

    const attachment = await prismaClient.eventTimelineAttachment.findFirst({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    if (!attachment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline attachment not found",
      });
    }

    await prismaClient.eventTimelineAttachment.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

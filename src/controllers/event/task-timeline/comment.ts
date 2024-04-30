import { Request, Response } from "express";
import { prismaClient } from "../../..";
import { errorResponse } from "../../../exceptions/error";

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

    if (!req.body.comment) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Comment is required",
      });
    }

    const comment = await prismaClient.eventTimeLineComment.create({
      data: {
        event_task_timeline_id: req.params.task_timeline_id,
        comment: req.body.comment,
      },
    });

    return res.status(201).json({
      success: true,
      data: comment,
      message: "Event task timeline comment created successfully",
    });
  } catch (e: any) {
    console.log(e);
    return errorResponse({ res, type: "internal error" });
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

    const comments = await prismaClient.eventTimeLineComment.findMany({
      where: {
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    return res.status(200).json({
      success: true,
      data: comments,
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

    const comment = await prismaClient.eventTimeLineComment.findFirst({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    if (!comment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline comment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: comment,
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

    const comment = await prismaClient.eventTimeLineComment.findFirst({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    if (!comment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline comment not found",
      });
    }

    if (!req.body.comment) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Comment is required",
      });
    }

    const updateComment = await prismaClient.eventTimeLineComment.update({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
      data: {
        comment: req.body.comment,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateComment,
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

    const comment = await prismaClient.eventTimeLineComment.findFirst({
      where: {
        id: req.params.id,
        event_task_timeline_id: req.params.task_timeline_id,
      },
    });

    if (!comment) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event task timeline comment not found",
      });
    }

    await prismaClient.eventTimeLineComment.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

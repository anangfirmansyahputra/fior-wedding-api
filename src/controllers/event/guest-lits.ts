import { Request, Response } from "express";
import { errorResponse } from "../../exceptions/error";
import { eventGuestListSchema } from "../../schema/event/guest-list";
import { prismaClient } from "../../index";

export const create = async (req: Request, res: Response) => {
  try {
    eventGuestListSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const guestList = await prismaClient.eventGuestList.create({
      data: {
        event_id: req.params.event_id,
        name: req.body.name,
        status: req.body.status,
        adult: req.body.adult,
        amount: req.body.amount,
        check_in_date: req.body.check_in_date,
        checkout: req.body.checkout,
        children: req.body.children,
        extra_bed: req.body.extra_bed,
        food_notes: req.body.food_notes,
        night: req.body.night,
        no_hp: req.body.no_hp,
        notes: req.body.notes,
        room_type: req.body.room_type,
        total_amount: req.body.total_amount,
        total_pax: req.body.total_pax,
        transport: req.body.transport,
        hotel: req.body.hotel,
      },
    });

    return res.status(201).json({
      success: true,
      data: guestList,
      message: "Guest List created successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const guestLists = await prismaClient.eventGuestList.findMany({
      where: {
        event_id: req.params.event_id,
      },
    });

    return res.status(200).json({
      success: true,
      data: guestLists,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const list = await prismaClient.eventGuestList.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!list) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event guest list not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: list,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    eventGuestListSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const list = await prismaClient.eventGuestList.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!list) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event guest list not found",
      });
    }

    const updateList = await prismaClient.eventGuestList.update({
      where: {
        id: req.params.id,
      },
      data: {
        event_id: req.params.event_id,
        name: req.body.name,
        status: req.body.status,
        adult: req.body.adult,
        amount: req.body.amount,
        check_in_date: req.body.check_in_date,
        checkout: req.body.checkout,
        children: req.body.children,
        extra_bed: req.body.extra_bed,
        food_notes: req.body.food_notes,
        night: req.body.night,
        no_hp: req.body.no_hp,
        notes: req.body.notes,
        room_type: req.body.room_type,
        total_amount: req.body.total_amount,
        total_pax: req.body.total_pax,
        transport: req.body.transport,
        hotel: req.body.hotel,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateList,
      message: "Event guest list updated successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const list = await prismaClient.eventGuestList.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!list) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event guest list not found",
      });
    }

    await prismaClient.eventGuestList.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

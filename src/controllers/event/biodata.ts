import { Request, Response } from "express";
import { eventBiodata } from "../../schema/event/biodata";
import { errorResponse } from "../../exceptions/error";
import { EventCollaborator, Prisma } from "@prisma/client";
import { prismaClient } from "../../index";

export const create = async (req: Request, res: Response) => {
  try {
    eventBiodata.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    if (!req.params.event_id) {
      return errorResponse({
        res,
        type: "not found",
        message: "Event not found",
      });
    }

    const eventBiodata = await prismaClient.eventBiodata.create({
      data: {
        event_id: req.params.event_id,
        type: req.body.type,
        mempelai_notes: req.body.mempelai_notes,
        mempelai_pic: req.body.mempelai_pic,
        mempelai_contact_number: req.body.mempelai_contact_number,
        teapai_bride_name: req.body.teapai_bride_name,
        teapai_bride_side: req.body.teapai_bride_side,
        teapai_bride_note: req.body.teapai_bride_note,
        teapai_groom_name: req.body.teapai_groom_name,
        teapai_groom_side: req.body.teapai_groom_side,
        teapai_groom_note: req.body.teapai_groom_note,
        makeup_name: req.body.makeup_name,
        makeup_mua: req.body.makeup_mua,
        makeup_teamnr: req.body.makeup_teamnr,
        makeup_retouch: req.body.makeup_retouch,
        makeup_room: req.body.makeup_room,
        makeup_note: req.body.makeup_note,
        corsages_name: req.body.corsages_name,
        corsages_note: req.body.corsages_note,
        transport_name: req.body.transport_name,
        transport_driver: req.body.transport_driver,
        transport_vehicle: req.body.transport_vehicle,
        transport_platenr: req.body.transport_platenr,
        transport_notes: req.body.transport_notes,
        event_layout: req.body.event_layout,
        foto_groom: req.body.foto_groom,
        foto_groom_note: req.body.foto_groom_note,
        foto_bride: req.body.foto_bride,
        foto_bride_note: req.body.foto_bride_note,
        foto_penjemputan: req.body.foto_penjemputan,
        foto_penjemputan_note: req.body.foto_penjemputan_note,
        order_nr: req.body.order_nr,
      },
    });

    return res.status(201).json({
      success: true,
      data: eventBiodata,
      message: "Biodata event successfully created",
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

    const biodata = await prismaClient.eventBiodata.findMany({
      where: {
        event_id: req.params.event_id,
      },
    });

    return res.status(200).json({
      success: true,
      data: biodata,
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

    const biodata = await prismaClient.eventBiodata.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!biodata) {
      return errorResponse({
        res,
        type: "not found",
        message: "Biodata not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: biodata,
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

    const biodata = await prismaClient.eventBiodata.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!biodata) {
      return errorResponse({
        res,
        type: "not found",
        message: "Biodata not found",
      });
    }

    const updateBiodata = await prismaClient.eventBiodata.update({
      where: {
        id: req.params.id,
      },
      data: {
        event_id: req.params.event_id,
        type: req.body.type,
        mempelai_notes: req.body.mempelai_notes,
        mempelai_pic: req.body.mempelai_pic,
        mempelai_contact_number: req.body.mempelai_contact_number,
        teapai_bride_name: req.body.teapai_bride_name,
        teapai_bride_side: req.body.teapai_bride_side,
        teapai_bride_note: req.body.teapai_bride_note,
        teapai_groom_name: req.body.teapai_groom_name,
        teapai_groom_side: req.body.teapai_groom_side,
        teapai_groom_note: req.body.teapai_groom_note,
        makeup_name: req.body.makeup_name,
        makeup_mua: req.body.makeup_mua,
        makeup_teamnr: req.body.makeup_teamnr,
        makeup_retouch: req.body.makeup_retouch,
        makeup_room: req.body.makeup_room,
        makeup_note: req.body.makeup_note,
        corsages_name: req.body.corsages_name,
        corsages_note: req.body.corsages_note,
        transport_name: req.body.transport_name,
        transport_driver: req.body.transport_driver,
        transport_vehicle: req.body.transport_vehicle,
        transport_platenr: req.body.transport_platenr,
        transport_notes: req.body.transport_notes,
        event_layout: req.body.event_layout,
        foto_groom: req.body.foto_groom,
        foto_groom_note: req.body.foto_groom_note,
        foto_bride: req.body.foto_bride,
        foto_bride_note: req.body.foto_bride_note,
        foto_penjemputan: req.body.foto_penjemputan,
        foto_penjemputan_note: req.body.foto_penjemputan_note,
        order_nr: req.body.order_nr,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateBiodata,
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

    const biodata = await prismaClient.eventBiodata.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!biodata) {
      return errorResponse({
        res,
        type: "not found",
        message: "Biodata not found",
      });
    }

    await prismaClient.eventBiodata.delete({
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

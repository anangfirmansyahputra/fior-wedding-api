import { Request, Response } from "express";
import { prismaClient } from "..";
import { eventVendorCreateSchema } from "../schema/event-vendor";

export const create = async (req: Request, res: Response) => {
  try {
    eventVendorCreateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: err?.issues,
    });
  }

  try {
    const event = await prismaClient.event.findFirst({
      where: {
        id: req.body.event_id,
      },
    });

    if (!event) {
      return res.status(404).json({
        errors: {
          message: "Event not found",
        },
      });
    }

    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: req.body.vendor_id,
      },
    });

    if (!vendor) {
      return res.status(404).json({
        errors: {
          message: "Vendor not found",
        },
      });
    }

    const eventVendor = await prismaClient.eventVendor.create({
      data: {
        event_id: req.body.event_id,
        vendor_id: req.body.vendor_id,
      },
    });

    return res.status(201).json({
      data: eventVendor,
    });
  } catch (err: any) {
    return res.status(400).json({
      error: {
        message: err?.message,
      },
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const eventVendors = await prismaClient.eventVendor.findMany({
      include: {
        vendor: true,
        event: true,
      },
    });

    return res.status(200).json({
      data: eventVendors,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const eventVendor = await prismaClient.eventVendor.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        vendor: true,
        event: true,
      },
    });

    if (!eventVendor) {
      return res.status(404).json({
        errors: {
          message: "Event vendor not found",
        },
      });
    }

    return res.status(200).json({
      data: eventVendor,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const deleteEventVendor = async (req: Request, res: Response) => {
  try {
    const eventVendor = await prismaClient.eventVendor.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!eventVendor) {
      return res.status(404).json({
        errors: {
          message: "Event vendor not found",
        },
      });
    }

    await prismaClient.eventVendor.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

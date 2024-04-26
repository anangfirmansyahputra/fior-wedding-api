import { Request, Response } from "express";
import { prismaClient } from "..";
import { customerBiodataSchema } from "../schema/customer-biodata";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { Prisma } from "@prisma/client";

// Create
export const create = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer not found",
        },
      });
    }

    customerBiodataSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_mesage: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.issues,
      },
    });
  }

  try {
    const customerBiodata = await prismaClient.customerBiodata.create({
      data: {
        client_name: req.body.client_name,
        phone_number: req.body.phone_number,
        address: req.body.address,
        venue: req.body.venue,
        total_pax: req.body.total_pax,
        total_invitation: req.body.total_invitation,
        budget_estimations: req.body.budget_estimations,
        attendance_type: req.body.attendance_type,
        holly_matrimony: req.body.holly_matrimony,
        resepsion: req.body.resepsion,
        seat_status: req.body.seat_status,
        tradition: req.body.tradition,
        occasion_type: req.body.occasion_type,
        customer_id: req.params.customer_id,
        note: req.body.note,
      },
    });

    return res.status(201).json({
      success: true,
      data: customerBiodata,
      message: "Customer created successfully",
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

// Get
export const gets = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer not found",
        },
      });
    }

    const customerBiodatas = await prismaClient.customerBiodata.findMany({
      where: {
        customer_id: req.params.customer_id,
      },
    });

    return res.status(200).json({
      success: true,
      data: customerBiodatas,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: {
        error_code: ErrorCode.INTERNAL_SERVER_ERROR,
        error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
        message: "Internal server error",
      },
    });
  }
};

// Find
export const find = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer not found",
        },
      });
    }

    const customerBiodata = await prismaClient.customerBiodata.findFirst({
      where: {
        id: req.params.id,
        customer_id: req.params.customer_id,
      },
    });

    if (!customerBiodata) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer biodata not found",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: customerBiodata,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errors: {
        error_code: ErrorCode.INTERNAL_SERVER_ERROR,
        error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
        message: "Internal server error",
      },
    });
  }
};

// Update
export const update = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer not found",
        },
      });
    }

    customerBiodataSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      errors: {
        error_code: ErrorCode.INVALID_INPUT,
        error_mesage: getErrorMessage(ErrorCode.INVALID_INPUT),
        message: err?.issues,
      },
    });
  }

  try {
    const customerBiodata = await prismaClient.customerBiodata.findFirst({
      where: {
        id: req.params.id,
        customer_id: req.params.customer_id,
      },
    });

    if (!customerBiodata) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer biodata not found",
        },
      });
    }

    const updateCustomerBiodata = await prismaClient.customerBiodata.update({
      where: {
        id: req.params.id,
        customer_id: req.params.customer_id,
      },
      data: {
        client_name: req.body.client_name,
        phone_number: req.body.phone_number,
        address: req.body.address,
        venue: req.body.venue,
        total_pax: req.body.total_pax,
        total_invitation: req.body.total_invitation,
        budget_estimations: req.body.budget_estimations,
        attendance_type: req.body.attendance_type,
        holly_matrimony: req.body.holly_matrimony,
        resepsion: req.body.resepsion,
        seat_status: req.body.seat_status,
        tradition: req.body.tradition,
        occasion_type: req.body.occasion_type,
        customer_id: req.params.customer_id,
        note: req.body.note,
      },
    });

    return res.status(200).json({
      success: true,
      data: updateCustomerBiodata,
      message: "Customer biodata updated successfully",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e.name);
        return res.status(400).json({
          success: false,
          errors: {
            error_code: ErrorCode.INVALID_INPUT,
            error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
            message: e.message,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: "Internal server error",
        },
      });
    }
  }
};

// Delete
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer not found",
        },
      });
    }

    const customerBiodata = await prismaClient.customerBiodata.findFirst({
      where: {
        id: req.params.id,
        customer_id: req.params.customer_id,
      },
    });

    if (!customerBiodata) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "Customer biodata not found",
        },
      });
    }

    await prismaClient.customerBiodata.delete({
      where: {
        id: req.params.id,
        customer_id: req.params.customer_id,
      },
    });

    return res.status(204).json({
      data: {},
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e.name);
        return res.status(400).json({
          success: false,
          errors: {
            error_code: ErrorCode.INVALID_INPUT,
            error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
            message: e.message,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: "Internal server error",
        },
      });
    }
  }
};

import { Request, Response } from "express";
import { prismaClient, exclude } from "..";
import { Prisma, User } from "@prisma/client";
import { ErrorCode, getErrorMessage } from "../lib/error-code";

// Create
export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.user_id || !req.body.event_id) {
      return res.status(400).json({
        success: false,
        errors: {
          error_code: ErrorCode.INVALID_INPUT,
          error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
          message: "User ID is required",
        },
      });
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: req.body.user_id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: {
          error_code: ErrorCode.NOT_FOUND,
          error_message: getErrorMessage(ErrorCode.NOT_FOUND),
          message: "User not found",
        },
      });
    }

    const customer = await prismaClient.customer.create({
      data: {},
    });

    return res.status(201).json({
      success: true,
      data: customer,
      message: "Customer created successfully",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002" || e.code === "P2003") {
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

// Get
export const gets = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const me = req.user;
    let customers;

    if (me.role.name === "Super Admin") {
      customers = await prismaClient.customer.findMany();
    } else {
      customers = await prismaClient.customer.findMany({
        where: {
          id: me?.customer?.id,
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (err) {
    console.log(err);

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
    // @ts-ignore
    const me = req.user;
    let customer;

    if (me.role.name === "Super Admin") {
      customer = await prismaClient.customer.findUnique({
        where: {
          id: req.params.id,
        },
      });
    } else {
      customer = await prismaClient.customer.findUnique({
        where: {
          id: me.customer.id,
        },
      });
    }

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

    return res.status(200).json({
      data: customer,
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

// Delete
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const me = req.user;
    let customer;

    if (me.role.name === "Super Admin") {
      customer = await prismaClient.customer.findUnique({
        where: {
          id: req.params.id,
        },
      });
    } else {
      return res.status(403).json({
        success: false,
        errors: {
          error_code: ErrorCode.ACCESS_DENIED,
          error_message: getErrorMessage(ErrorCode.ACCESS_DENIED),
          message: "This account has no permissions",
        },
      });
    }

    if (!customer) {
      return res.status(404).json({
        errors: {
          message: "Customer not found",
        },
      });
    }

    await prismaClient.customer.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
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

import { Request, Response } from "express";
import { prismaClient, exclude } from "..";
import { Prisma, User } from "@prisma/client";
import { ErrorCode, getErrorMessage } from "../lib/error-code";
import { errorResponse } from "../exceptions/error";

// Create
export const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.no_hp) {
      return errorResponse({
        res,
        type: "invalid",
        message: "Please input name and phone number",
      });
    }

    const customer = await prismaClient.customer.create({
      data: {
        name: req.body.name,
        no_hp: req.body.no_hp,
      },
    });

    return res.status(201).json({
      success: true,
      data: customer,
      message: "Customer created successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};
// Get
export const get = async (req: Request, res: Response) => {
  try {
    const customers = await prismaClient.customer.findMany({});

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

// Find
export const find = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return errorResponse({
        res,
        type: "not found",
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return errorResponse({
        res,
        type: "not found",
        message: "Customer not found",
      });
    }

    const data = await prismaClient.customer.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        no_hp: req.body.no_hp,
      },
    });

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return errorResponse({
        res,
        type: "not found",
        message: "Customer not found",
      });
    }

    await prismaClient.customer.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

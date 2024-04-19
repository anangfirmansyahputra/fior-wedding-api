import { Request, Response } from "express";
import { prismaClient } from "..";

export const create = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.create({
      data: {},
    });

    return res.status(201).json({
      data: customer,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const gets = async (req: Request, res: Response) => {
  try {
    const customers = await prismaClient.customer.findMany({});

    return res.status(200).json({
      data: customers,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

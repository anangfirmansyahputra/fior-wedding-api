import { Request, Response } from "express";
import { prismaClient } from "..";

// Create
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

// Get
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

// Find
export const find = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        errors: {
          message: "Customer not found",
        },
      });
    }

    return res.status(200).json({
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

// Delete
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: req.params.id,
      },
    });

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
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: err.message,
      },
    });
  }
};

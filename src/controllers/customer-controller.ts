import { Request, Response } from "express";
import { prismaClient, exclude } from "..";
import { User } from "@prisma/client";

// Create
export const create = async (req: Request, res: Response) => {
  try {
    const customer = await prismaClient.customer.create({
      data: {
        // @ts-ignore
        user_id: req.user.id,
      },
    });

    return res.status(201).json({
      data: customer,
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
    // @ts-ignore
    const me = req.user;
    let customers;

    if (me?.role?.super === true) {
      customers = await prismaClient.customer.findMany({
        include: {
          customer_biodata: {
            select: exclude("customerBiodata", ["customer_id"]),
          },
          event: {
            select: exclude("event", ["customer_id"]),
          },
        },
      });
    } else {
      customers = await prismaClient.customer.findMany({
        where: {
          // @ts-ignore
          user_id: req.user.id,
        },
        include: {
          customer_biodata: {
            select: exclude("customerBiodata", ["customer_id"]),
          },
          event: {
            select: exclude("event", ["customer_id"]),
          },
        },
      });
    }

    return res.status(200).json({
      data: customers,
    });
  } catch (err) {
    console.log(err);

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
    // @ts-ignore
    const me = req.user;
    let customer;

    if (me?.role?.super === true) {
      customer = await prismaClient.customer.findUnique({
        where: {
          id: req.params.id,
          // @ts-ignore
        },
      });
    } else {
      customer = await prismaClient.customer.findUnique({
        where: {
          id: req.params.id,
          // @ts-ignore
          user_id: req.user.id,
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
    // @ts-ignore
    const me = req.user;
    let customer;

    if (me?.role?.super === true) {
      customer = await prismaClient.customer.findUnique({
        where: {
          id: req.params.id,
          // @ts-ignore
        },
      });
    } else {
      customer = await prismaClient.customer.findUnique({
        where: {
          id: req.params.id,
          // @ts-ignore
          user_id: req.user.id,
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
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

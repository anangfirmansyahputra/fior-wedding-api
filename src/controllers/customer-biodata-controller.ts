import { Request, Response } from "express";
import { prismaClient } from "..";
import {
  customerBiodataCreateSchema,
  customerBiodataUpdateSchema,
} from "../schema/customer-biodata";

// Create
export const create = async (req: Request, res: Response) => {
  try {
    customerBiodataCreateSchema.parse(req.body);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      errors: {
        message: err?.issues,
      },
    });
  }

  try {
    const { first_name, last_name, email, phone_number, address, customer_id } =
      req.body;

    const customer = await prismaClient.customer.findUnique({
      where: {
        id: customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        errors: {
          message: "Customer not found",
        },
      });
    }

    const customerBiodata = await prismaClient.customerBiodata.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        address,
        customer_id,
      },
    });

    return res.status(201).json({
      data: customerBiodata,
    });
  } catch (err: any) {
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
    const customerBiodatas = await prismaClient.customerBiodata.findMany();

    return res.status(200).json({
      data: customerBiodatas,
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
    const customerBiodata = await prismaClient.customerBiodata.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!customerBiodata) {
      return res.status(404).json({
        errors: {
          message: "Customer biodata not found",
        },
      });
    }

    return res.status(200).json({
      data: customerBiodata,
    });
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

// Update
export const update = async (req: Request, res: Response) => {
  try {
    customerBiodataUpdateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.issues,
      },
    });
  }

  try {
    const customerBiodata = await prismaClient.customerBiodata.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!customerBiodata) {
      return res.status(404).json({
        errors: {
          message: "Customer biodata not found",
        },
      });
    }

    const { customer_id, ...payload } = req.body;

    const updateCustomerBiodata = await prismaClient.customerBiodata.update({
      where: {
        id: req.params.id,
      },
      data: payload,
    });

    return res.status(200).json({
      data: updateCustomerBiodata,
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
    const customerBiodata = await prismaClient.customerBiodata.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!customerBiodata) {
      return res.status(404).json({
        errors: {
          message: "Customer biodata not found",
        },
      });
    }

    await prismaClient.customerBiodata.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(204);
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

import { Request, Response } from "express";
import { prismaClient } from "..";
import {
  customerBiodataCreateSchema,
  customerBiodataUpdateSchema,
} from "../schema/customer-biodata";

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
        errors: {
          message: "Customer not found",
        },
      });
    }

    customerBiodataCreateSchema.parse(req.body);
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({
      errors: err?.issues,
    });
  }

  try {
    const customerBiodata = await prismaClient.customerBiodata.create({
      data: {
        customer_id: req.params.customer_id,
        ...req.body,
      },
    });

    return res.status(201).json({
      data: customerBiodata,
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
        errors: {
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
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        errors: {
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
    const customer = await prismaClient.customer.findFirst({
      where: {
        id: req.params.customer_id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        errors: {
          message: "Customer not found",
        },
      });
    }

    customerBiodataUpdateSchema.parse(req.body);
  } catch (err: any) {
    return res.status(400).json({
      errors: err?.issues,
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
        errors: {
          message: "Customer biodata not found",
        },
      });
    }

    const { customer_id, ...payload } = req.body;

    const updateCustomerBiodata = await prismaClient.customerBiodata.update({
      where: {
        id: req.params.id,
        customer_id: req.params.customer_id,
      },
      data: payload,
    });

    return res.status(200).json({
      data: updateCustomerBiodata,
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
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
        errors: {
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
        errors: {
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
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

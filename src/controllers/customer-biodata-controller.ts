import { Request, Response } from "express";
import { prismaClient } from "..";
import { customerBiodataCreateSchema } from "../schema/customer-biodata";

//
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

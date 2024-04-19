import { Request, Response } from "express";
import { prismaClient } from "..";

export const create = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, phone_number, address } = req.body;

    const customerBiodata = await prismaClient.customerBiodata.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        address,
      },
    });

    return res.status(201).json({
      data: customerBiodata,
    });
  } catch (err: any) {
    return res.status(400).json({
      errors: {
        message: err?.issues,
      },
    });
  }
};

import axios from "axios";
import { Request, Response } from "express";
import { prismaClient } from "..";

export const scrappingVendorCategory = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(
      "https://secure-cdn-api.bridestory.com/_public/v2/vendor_categories/?bs-localization-bucket=ID&bs-translation-bucket=id"
    );

    const vendorCategories = data.categories;

    for (const category of vendorCategories) {
      await prismaClient.vendorCategory.upsert({
        where: { id: category.id },
        create: {
          id: category.id,
          name: category.name,
          status: category.status,
          slug: category.slug,
          description: category.description,
          imageUrl: category.imageUrl,
        },
        update: {
          name: category.name,
          status: category.status,
          slug: category.slug,
          description: category.description,
          imageUrl: category.imageUrl,
        },
      });
    }

    return res.status(200).json({
      data: vendorCategories,
    });
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const getVendorCategory = async (req: Request, res: Response) => {
  try {
    const vendorCategories = await prismaClient.vendorCategory.findMany();

    return res.status(200).json({
      data: vendorCategories,
    });
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

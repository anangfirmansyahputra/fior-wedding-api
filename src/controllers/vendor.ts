import { Prisma } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";
import { prismaClient } from "..";
import { errorResponse } from "../exceptions/error";
import { createPagination } from "../lib/utils";
import { vendorSchema } from "../schema/vendor";

export const scrappingVendor = async (req: Request, res: Response) => {
  try {
    let next = null;
    let vendors;

    do {
      const url: string = next
        ? `https://secure-cdn-api.bridestory.com/ms/feeds/api/v1/vendors?country=ID&next=${next}&is_mobile=false&ads=true&bs-localization-bucket=ID&bs-translation-bucket=id`
        : `https://secure-cdn-api.bridestory.com/ms/feeds/api/v1/vendors?country=ID&is_mobile=false&ads=true&bs-localization-bucket=ID&bs-translation-bucket=id`;

      console.log(next);

      // @ts-ignore
      const { data } = await axios.get(url);
      next = data.pagination.next;
      vendors = data.vendors;

      if (vendors.length === 0) {
        next = null;
        console.log("Scrapping vendors success");
      }

      for (const vendor of vendors) {
        await prismaClient.vendor.upsert({
          where: {
            id: vendor.id,
          },
          update: {
            id: vendor.id,
            name: vendor.name,
            category: vendor.category.name,
            city: vendor.city.slug,
            category_slug: vendor.category.slug,
            city_slug: vendor.city.slug,
            contact: null,
            cover: vendor.cover,
            slug: vendor.slug,
          },
          create: {
            id: vendor.id,
            name: vendor.name,
            category: vendor.category.name,
            city: vendor.city.slug,
            category_slug: vendor.category.slug,
            city_slug: vendor.city.slug,
            contact: null,
            cover: vendor.cover,
            slug: vendor.slug,
          },
        });
      }
    } while (next);
  } catch (err) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const getVendors = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const name = (req.query.name as string) || "";
    const category = (req.query.category as string) || "";
    const city = (req.query.city as string) || "";

    const offset = (page - 1) * pageSize;
    const whereClause = {} as any;

    if (category) {
      whereClause.category = category;
    }

    if (city) {
      whereClause.city = city;
    }

    if (name) {
      whereClause.name = {
        contains: name,
      };
    }

    const vendors = await prismaClient.vendor.findMany({
      skip: offset,
      take: pageSize,
      where: whereClause,
    });

    const totalCount = await prismaClient.vendor.count({
      where: whereClause,
    });
    // const hasNextPage = page * pageSize < totalCount;
    // const hasPreviousPage = page > 1;

    // let nextPage = null;
    // if (hasNextPage) {
    //   nextPage = page + 1;
    // }

    // let previousPage = null;
    // if (hasPreviousPage) {
    //   previousPage = page - 1;
    // }

    const { next_page, previous_age, current_page, total } = createPagination(
      page,
      pageSize,
      totalCount
    );

    return res.status(200).json({
      data: vendors,
      page_info: {
        next_page: vendors.length === 0 ? null : next_page,
        previous_page: vendors.length === 0 ? null : previous_age,
        current_page,
        total,
      },
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    vendorSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const vendor = await prismaClient.vendor.create({
      data: {
        category: req.body.category,
        category_slug: req.body.category_slug,
        city: req.body.city,
        city_slug: req.body.city_slug,
        name: req.body.name,
        slug: req.body.slug,
        contact: req.body.contact,
        cover: req.file?.filename
          ? process.env.APP_URL + "/upload/" + req.file?.filename
          : null,
      },
    });

    return res.status(201).json({
      success: true,
      data: vendor,
      message: "Vendor created successfully",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return errorResponse({ res, type: "invalid", message: e.message });
      }
    } else {
      return errorResponse({ res, type: "internal error" });
    }
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return errorResponse({
        res,
        type: "not found",
        message: "Vendor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: vendor,
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    vendorSchema.parse(req.body);
  } catch (e: any) {
    return errorResponse({ res, type: "invalid", message: e?.issues });
  }

  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return errorResponse({
        res,
        type: "not found",
        message: "Vendor not found",
      });
    }

    const data = await prismaClient.vendor.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        category: req.body.category,
        category_slug: req.body.category_slug,
        city: req.body.city,
        city_slug: req.body.city_slug,
        name: req.body.name,
        slug: req.body.slug,
        contact: req.body.contact,
        cover: req.file?.filename
          ? process.env.APP_URL + "/upload/" + req.file?.filename
          : null,
      },
    });

    return res.status(200).json({
      success: true,
      data,
      message: "Vendor updated successfully",
    });
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const vendor = await prismaClient.vendor.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!vendor) {
      return errorResponse({
        res,
        type: "not found",
        message: "Vendor not found",
      });
    }

    await prismaClient.vendor.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(204).json({});
  } catch (e: any) {
    return errorResponse({ res, type: "internal error" });
  }
};

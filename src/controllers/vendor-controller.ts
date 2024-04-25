import axios from "axios";
import { Request, Response } from "express";
import { prismaClient } from "..";
import { createPagination } from "../lib/utils";
import { Prisma } from "@prisma/client";
import { ErrorCode, getErrorMessage } from "../lib/error-code";

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
            data: vendor,
            name: vendor.name,
            category: vendor.category.slug,
            city: vendor.city.slug,
          },
          create: {
            id: vendor.id,
            data: vendor,
            name: vendor.name,
            category: vendor.category.slug,
            city: vendor.city.slug,
          },
        });
      }
    } while (next);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

export const getVendors = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const name = (req.query.name as string) || "";
    // const country = (req.query.country as string) || "";
    const category = (req.query.category as string) || "";
    const city = (req.query.city as string) || "";

    const offset = (page - 1) * pageSize;
    const whereClause = {} as any;

    // if (country) {
    //   whereClause.country = country;
    // }

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
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e.name);
        return res.status(400).json({
          success: false,
          errors: {
            error_code: ErrorCode.INVALID_INPUT,
            error_message: getErrorMessage(ErrorCode.INVALID_INPUT),
            message: e.message,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        errors: {
          error_code: ErrorCode.INTERNAL_SERVER_ERROR,
          error_message: getErrorMessage(ErrorCode.INTERNAL_SERVER_ERROR),
          message: "Internal server error",
        },
      });
    }
  }
};

import axios from "axios";
import { Request, Response } from "express";
import { prismaClient } from "..";

export const scrappingVendor = async (req: Request, res: Response) => {
  try {
    let next = null;
    let vendors;

    do {
      const url: string = next
        ? `https://secure-cdn-api.bridestory.com/ms/feeds/api/v1/vendors?next=${next}&is_mobile=false&ads=true&bs-localization-bucket=ID&bs-translation-bucket=id`
        : `https://secure-cdn-api.bridestory.com/ms/feeds/api/v1/vendors?is_mobile=false&ads=true&bs-localization-bucket=ID&bs-translation-bucket=id`;

      console.log(next);

      // @ts-ignore
      const { data } = await axios.get(url);
      next = data.pagination.next;
      vendors = data.vendors;

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
            country: vendor.country.iso,
          },
          create: {
            id: vendor.id,
            data: vendor,
            name: vendor.name,
            category: vendor.category.slug,
            country: vendor.country.iso,
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
    const country = (req.query.country as string) || "";
    const category = (req.query.category as string) || "";

    const offset = (page - 1) * pageSize;
    const whereClause = {} as any;

    if (country) {
      whereClause.country = country;
    }

    if (category) {
      whereClause.category = category;
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
    const hasNextPage = page * pageSize < totalCount;
    const hasPreviousPage = page > 1;

    let nextPage = null;
    if (hasNextPage) {
      nextPage = page + 1;
    }

    let previousPage = null;
    if (hasPreviousPage) {
      previousPage = page - 1;
    }

    return res.status(200).json({
      data: vendors,
      page_info: {
        next_page: vendors.length === 0 ? null : nextPage,
        previous_page: vendors.length === 0 ? null : previousPage,
        current_page: page,
        total: totalCount,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

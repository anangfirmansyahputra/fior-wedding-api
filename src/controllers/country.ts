import { Country } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";
import { prismaClient } from "..";

export const getCountry = async (req: Request, res: Response) => {
  const country = await prismaClient.country.findMany();
  return res.status(200).json({
    data: [...country],
  });
};

export const scrappingCountry = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(
      "https://secure-cdn-api.bridestory.com/_public/v2/country/conditional_cities?bs-localization-bucket=ID&bs-translation-bucket=id"
    );

    const countries = data.countries as Country[];

    for (const country of countries) {
      await prismaClient.country.upsert({
        where: {
          id: country.id,
        },
        create: {
          id: country.id,
          name: country.name,
          iso: country.iso,
          iso3: country.iso3,
          nicename: country.nicename,
          numcode: country.numcode,
          phonecode: country.phonecode,
          slug: country.slug,
        },
        update: {
          id: country.id,
          name: country.name,
          iso: country.iso,
          iso3: country.iso3,
          nicename: country.nicename,
          numcode: country.numcode,
          phonecode: country.phonecode,
          slug: country.slug,
        },
      });
    }

    return res.status(200).json({
      data: {
        message: "Scrapping country success",
      },
    });
  } catch (err: any) {
    res.status(400).json({
      errors: {
        message: err?.message,
      },
    });
  }
};

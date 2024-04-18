import axios from "axios";
import { prismaClient } from "..";
import { Country } from "@prisma/client";

async function run() {
  try {
    const data = await axios.get(
      `https://secure-cdn-api.bridestory.com/_public/v2/country/conditional_cities?bs-localization-bucket=ID&bs-translation-bucket=id`
    );

    const countries = data.data.countries as Country[];
    for (const country of countries) {
      await prismaClient.country.create({
        data: {
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

    console.log(data.data.countries);
  } catch (err) {
    console.log(err);
  }
}

run();

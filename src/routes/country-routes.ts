import { Router } from "express";
import {
  getCountry,
  scrappingCountry,
} from "../controllers/country-controller";

export const countryRouter: Router = Router();

countryRouter.get("/", getCountry);
countryRouter.post("/scrapping", scrappingCountry);

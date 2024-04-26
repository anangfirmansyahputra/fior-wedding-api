import { z } from "zod";

export const customerBiodataSchema = z.object({
  client_name: z.string(),
  phone_number: z.string(),
  address: z.string(),
  venue: z.enum(["INDOOR", "OUTDOOR"]),
  total_pax: z.number(),
  total_invitation: z.number(),
  budget_estimations: z.number(),
  attendance_type: z.enum(["HALF_DAY", "FULL_DAY"]),
  holly_matrimony: z.enum([
    "AKAD_NIKAH",
    "KATOLIK",
    "BUDHA",
    "KRISTEN",
    "HINDU",
  ]),
  resepsion: z.boolean(),
  seat_status: z.enum(["SEATING", "STANDING"]),
  tradition: z.enum([
    "INTERNATIONAL",
    "TRADITIONAL_JAWA",
    "TRADITIONAL_SUNDA",
    "ETC",
  ]),
  occasion_type: z.enum(["COCKTAIL", "AFTER_PARTY"]),
  customer_id: z.string(),
  note: z.optional(z.string()),
});

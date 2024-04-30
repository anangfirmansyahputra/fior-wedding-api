import { z } from "zod";

export const eventGuestListSchema = z.object({
  name: z.string(),
  total_pax: z.number(),
  no_hp: z.optional(z.string()),
  status: z.string(),
  adult: z.optional(z.string()),
  children: z.optional(z.string()),
  food_notes: z.optional(z.string()),
  hotel: z.optional(z.string()),
  room_type: z.optional(z.string()),
  check_in_date: z.optional(z.string().datetime()),
  checkout: z.optional(z.string().datetime()),
  night: z.optional(z.string()),
  extra_bed: z.optional(z.string()),
  transport: z.optional(z.string()),
  notes: z.optional(z.string()),
  amount: z.optional(z.number()),
  total_amount: z.optional(z.number()),
});

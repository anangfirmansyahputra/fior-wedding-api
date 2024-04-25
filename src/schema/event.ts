import { z } from "zod";

export const eventSchema = z.object({
  client_name: z.string().min(3),
  estimate_guest: z.number(),
  guest_arrival: z.string().datetime(),
  guest_departure: z.string().datetime(),
  venue_name: z.string(),
  venue_address: z.string().min(10),
  archive: z.optional(z.boolean()),
});

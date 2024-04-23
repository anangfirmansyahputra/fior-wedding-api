import { z } from "zod";

export const eventSchema = z.object({
  customer_id: z.string().min(6),
  estimate_guest: z.number(),
  client_name: z.string().min(3),
  guest_arrival: z.string().datetime(),
  guest_departure: z.string().datetime(),
  venue_address: z.string().min(10),
  archive: z.optional(z.boolean()),
});

export const eventUpdateSchema = z.object({
  event_name: z.optional(z.string().min(3)),
  event_description: z.optional(z.string().min(6)),
  start_date: z.optional(z.string().datetime()),
  end_date: z.optional(z.string().datetime()),
  location: z.optional(z.string().min(10)),
  status: z.optional(z.enum([" SCHEDULED", "ONGOING", "COMPLETED"])),
});

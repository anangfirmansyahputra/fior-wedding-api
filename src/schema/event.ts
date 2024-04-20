import { z } from "zod";

export const eventCreateSchema = z.object({
  customer_id: z.string().min(6),
  name: z.string().min(3),
  description: z.optional(z.string().min(6)),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  location: z.string().min(10),
  status: z.optional(z.enum([" SCHEDULED", "ONGOING", "COMPLETED"])),
});

export const eventUpdateSchema = z.object({
  name: z.optional(z.string().min(3)),
  description: z.optional(z.string().min(6)),
  start_date: z.optional(z.string().datetime()),
  end_date: z.optional(z.string().datetime()),
  location: z.optional(z.string().min(10)),
  status: z.optional(z.enum([" SCHEDULED", "ONGOING", "COMPLETED"])),
});
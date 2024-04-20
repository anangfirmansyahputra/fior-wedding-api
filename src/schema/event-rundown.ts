import { z } from "zod";

export const eventRundownCreateSchema = z.object({
  activity_name: z.string(),
  location: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
});

export const eventRundownUpdateSchema = z.object({
  activity_name: z.optional(z.string()),
  location: z.optional(z.string()),
  start_time: z.optional(z.string().datetime()),
  end_time: z.optional(z.string().datetime()),
});

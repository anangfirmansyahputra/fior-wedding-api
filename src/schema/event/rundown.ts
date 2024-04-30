import { z } from "zod";

export const eventRundownSchema = z.object({
  rundown_name: z.string(),
  rundown_date: z.string(),
  rundown_start_datetime: z.string().datetime(),
  rundown_end_datetime: z.string().datetime(),
  rundown_notes: z.string(),
  rundown_location: z.string(),
});

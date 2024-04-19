import { z } from "zod";

export const customerBiodataCreateSchema = z.object({
  first_name: z.string(),
  last_name: z.string().nullable(),
  email: z.string().email(),
  phone_number: z.string(),
  address: z.string(),
});

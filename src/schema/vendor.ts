import { z } from "zod";

export const vendorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  cover: z.optional(z.string()),
  category: z.string(),
  category_slug: z.string(),
  city: z.string(),
  city_slug: z.string(),
  contact: z.optional(z.string()),
});

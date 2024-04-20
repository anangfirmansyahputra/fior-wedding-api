import { z } from "zod";

export const eventVendorCreateSchema = z.object({
  vendor_id: z.number(),
});

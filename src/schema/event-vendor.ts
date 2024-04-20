import { z } from "zod";

export const eventVendorCreateSchema = z.object({
  event_id: z.string(),
  vendor_id: z.number(),
});

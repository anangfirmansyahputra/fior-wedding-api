import { z } from "zod";

export const eventPaymentSchema = z.object({
  // expense_name: z.string(),
  vendor_name: z.string(),
  price: z.number(),
  amount_paid: z.optional(z.number()),
});

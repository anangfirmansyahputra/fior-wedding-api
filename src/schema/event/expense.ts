import { z } from "zod";

export const eventExpenseSchema = z.object({
  category: z.enum([
    "VENUE",
    "FOOD",
    "RECEPTION",
    "ATTIRE",
    "MAKEUP",
    "OTHERS",
  ]),
  expense_name: z.string(),
  quantity: z.number(),
  price: z.number(),
  notes: z.optional(z.string()),
  vendor_id: z.number(),
  status: z.enum(["PAID", "PARTIAL_PAID", "UNPAID"]),
});

import { z } from "zod";

export const eventPaymentCreateSchema = z.object({
  amount: z.number(),
  payment_method: z.enum(["CREDIT_CARD", "BANK_TRANSFER", "CASH"]),
  payment_status: z.enum(["PENDING", "COMPLETED", "FAILED"]),
});

export const eventPaymentUpdateSchema = z.object({
  amount: z.optional(z.number()),
  payment_method: z.optional(z.enum(["CREDIT_CARD", "BANK_TRANSFER", "CASH"])),
  payment_status: z.optional(z.enum(["PENDING", "COMPLETED", "FAILED"])),
});

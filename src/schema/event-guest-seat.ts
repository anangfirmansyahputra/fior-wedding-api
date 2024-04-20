import { z } from "zod";

export const eventGuestSeatCreateSchema = z.object({
  guest_name: z.string().min(3),
  seat_category: z.enum(["VIP", "REGULAR", "SPECIAL"]),
  seat_number: z.optional(z.string()),
});

export const eventGuestSeatUpdateSchema = z.object({
  guest_name: z.optional(z.string().min(3)),
  seat_category: z.optional(z.enum(["VIP", "REGULAR", "SPECIAL"])),
  seat_number: z.optional(z.string()),
});

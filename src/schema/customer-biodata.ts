import { z } from "zod";

export const customerBiodataCreateSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.optional(z.string().min(3)),
  email: z.string().email(),
  phone_number: z.string().min(10),
  address: z.string().min(10),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  birthday: z.optional(z.string().datetime()),
});

export const customerBiodataUpdateSchema = z.object({
  first_name: z.optional(z.string().min(3)),
  last_name: z.optional(z.string().min(3)),
  email: z.optional(z.string().email()),
  phone_number: z.optional(z.string().min(10)),
  address: z.optional(z.string().min(10)),
  gender: z.optional(z.enum(["MALE", "FEMALE", "OTHER"])),
  birthday: z.optional(z.string().datetime()),
});

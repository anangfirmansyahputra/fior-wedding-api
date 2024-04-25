import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  username: z.string().min(6),
  password: z.string().min(6),
  user_status: z.enum(["User", "Customer"]),
  role_id: z.optional(z.string().min(6)),
});

export const loginSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(6),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().nullable(),
  password: z.optional(z.string().min(6)),
  role_id: z.optional(z.string().min(6)),
});

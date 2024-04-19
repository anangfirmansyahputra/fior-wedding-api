import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  username: z.string().min(6),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(6),
});

import { z } from "zod";

export const taskTimelineSchema = z.object({
  category: z.string(),
  task_name: z.string(),
  task_description: z.string(),
  start_date: z.string().datetime(),
  due_date: z.string().datetime(),
  event_vendor_id: z.string(),
  status: z.string(),
  notes: z.optional(z.string()),
  order_nr: z.optional(z.number()),
  users: z.array(z.string()),
});

import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  dueDate: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid date"),
})

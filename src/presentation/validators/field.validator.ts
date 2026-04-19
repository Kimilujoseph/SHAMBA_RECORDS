import { z } from "zod";

export const createFieldSchema = z.object({
  name: z.string().min(1),
  cropType: z.string().min(1),
  plantingDate: z.string().datetime(),
  assignedToId: z.string().optional(),
});

export const updateFieldSchema = z.object({
  name: z.string().min(1).optional(),
  cropType: z.string().min(1).optional(),
  plantingDate: z.string().datetime().optional(),
  stage: z.enum(["PLANTED", "GROWING", "READY", "HARVESTED"]).optional(),
  notes: z.string().optional(),
  status: z.enum(["ACTIVE", "AT_RISK", "COMPLETED"]).optional(),
  assignedToId: z.string().nullable().optional(),
});

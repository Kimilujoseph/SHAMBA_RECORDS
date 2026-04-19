import { updateFieldSchema } from "../../presentation/validators/field.validator";

export interface CreateFieldDto {
  name: string;
  cropType: string;
  plantingDate: string; // ISO date string
  assignedToId?: string;
}

export interface UpdateFieldDto {
  name?: string;
  cropType?: string;
  plantingDate?: string;
  stage?: "PLANTED" | "GROWING" | "READY" | "HARVESTED";
  notes?: string;
  assignedToId?: string | null;
}

export interface FieldResponseDto {
  id: string;
  name: string;
  cropType: string;
  plantingDate: Date;
  stage: string;
  notes: string | null;
  status: string | null;
  assignedTo: {
    id: string;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FieldInterface {
  id: string;
  name: string;
  cropType: string;
  plantingDate: Date;
  stage: string | null;
  notes: string | null;
  status: string | null;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const Stage = {
  PLANTED: "PLANTED",
  GROWING: "GROWING",
  READY: "READY",
  HARVESTED: "HARVESTED",
} as const;

export type Stage = (typeof Stage)[keyof typeof Stage];

export type UpdateFieldDTO = Partial<{
  name: string;
  cropType: string;
  plantingDate: Date;
  stage: Stage;
  notes: string;
  status: string;
  assignedToId: string | null;
}>;

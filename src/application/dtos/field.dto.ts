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
  stage?: 'PLANTED' | 'GROWING' | 'READY' | 'HARVESTED';
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

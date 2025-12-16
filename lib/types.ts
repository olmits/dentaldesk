export type TreatmentStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Treatment {
  id: number;
  patient: string;
  procedure: string;
  dentist: string;
  date: string;
  status?: TreatmentStatus;
  notes?: string;
  cost?: number;
}

export type TreatmentFormField = 
  | "patient"
  | "procedure"
  | "dentist"
  | "date"
  | "notes";

export enum TreatmentFormFieldEnum {
  PATIENT = "patient",
  PROCEDURE = "procedure",
  DENTIST = "dentist",
  DATE = "date",
  NOTES = "notes",
}

export interface TreatmentFormData {
  [TreatmentFormFieldEnum.PATIENT]: string;
  [TreatmentFormFieldEnum.PROCEDURE]: string;
  [TreatmentFormFieldEnum.DENTIST]: string;
  [TreatmentFormFieldEnum.DATE]: string;
  [TreatmentFormFieldEnum.NOTES]?: string;
}

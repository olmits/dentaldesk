import { z } from "zod";

export const treatmentFormSchema = z.object({
  patient: z
    .string()
    .min(1, "Patient name is required")
    .min(2, "Patient name must be at least 2 characters")
    .max(100, "Patient name must be less than 100 characters")
    .trim(),
  
  procedure: z
    .string()
    .min(1, "Procedure is required")
    .min(2, "Procedure must be at least 2 characters")
    .max(200, "Procedure must be less than 200 characters")
    .trim(),
  
  dentist: z
    .string()
    .min(1, "Dentist is required")
    .min(2, "Dentist name must be at least 2 characters")
    .max(100, "Dentist name must be less than 100 characters")
    .trim(),
  
  date: z
    .string()
    .min(1, "Date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Please enter a valid date")
    .refine((date) => {
      const parsedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsedDate >= today;
    }, "Date cannot be in the past"),
  
  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional()
    .default(""),
});

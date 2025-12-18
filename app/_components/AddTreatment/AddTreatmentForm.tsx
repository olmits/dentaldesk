import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TREATMENT_FORM_ID } from "@/lib/constants/form";
import { treatmentFormSchema } from "@/lib/schemas/treatmentFormSchema";
import AddTreatmentInput from "./AddTreatmentInput";
import AddTreatmentTextarea from "./AddTreatmentTextarea";
import { TreatmentFormData, TreatmentFormFieldEnum } from "@/lib/types";

interface AddTreatmentFormProps {
    isLoading?: boolean;
    onSubmit: (data: TreatmentFormData) => void;
}

export default function AddTreatmentForm({ isLoading = false, onSubmit }: AddTreatmentFormProps) {
  const form = useForm<TreatmentFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(treatmentFormSchema),
  });

  return (
    <FormProvider {...form}>
      <form id={TREATMENT_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.PATIENT}
            name={TreatmentFormFieldEnum.PATIENT}
            label="Patient"
            placeholder="Jane Doe"
            disabled={isLoading}
          />
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.PROCEDURE}
            name={TreatmentFormFieldEnum.PROCEDURE}
            label="Procedure"
            placeholder="Filling"
            disabled={isLoading}
          />
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.DENTIST}
            name={TreatmentFormFieldEnum.DENTIST}
            label="Dentist"
            placeholder="Dr. Smith"
            disabled={isLoading}
          />
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.DATE}
            name={TreatmentFormFieldEnum.DATE}
            label="Date"
            type="date"
            disabled={isLoading}
          />
          <AddTreatmentTextarea
            id={TreatmentFormFieldEnum.NOTES}
            name={TreatmentFormFieldEnum.NOTES}
            label="Notes"
            placeholder="Add any treatment notes"
            disabled={isLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
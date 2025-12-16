import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TREATMENT_FORM_ID } from "@/lib/constants/form";
import { treatmentFormSchema } from "@/lib/schemas/treatmentFormSchema";
import AddTreatmentInput from "./AddTreatmentInput";
import AddTreatmentTextarea from "./AddTreatmentTextarea";
import { TreatmentFormData, TreatmentFormFieldEnum } from "@/lib/types";

export default function AddTreatmentForm() {
  const form = useForm<TreatmentFormData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(treatmentFormSchema),
  });

  const onSubmit = (data: TreatmentFormData) => {
    // eslint-disable-next-line no-console
    console.log("Form submitted:", data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    // eslint-disable-next-line no-console
    console.log("Form errors:", errors);
  };

  return (
    <FormProvider {...form}>
      <form id={TREATMENT_FORM_ID} onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="space-y-4">
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.PATIENT}
            name={TreatmentFormFieldEnum.PATIENT}
            label="Patient"
            placeholder="Jane Doe"
          />
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.PROCEDURE}
            name={TreatmentFormFieldEnum.PROCEDURE}
            label="Procedure"
            placeholder="Filling"
          />
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.DENTIST}
            name={TreatmentFormFieldEnum.DENTIST}
            label="Dentist"
            placeholder="Dr. Smith"
          />
          <AddTreatmentInput
            id={TreatmentFormFieldEnum.DATE}
            name={TreatmentFormFieldEnum.DATE}
            label="Date"
            type="date"
          />
          <AddTreatmentTextarea
            id={TreatmentFormFieldEnum.NOTES}
            name={TreatmentFormFieldEnum.NOTES}
            label="Notes"
            placeholder="Add any treatment notes"
          />
        </div>
      </form>
    </FormProvider>
  );
}
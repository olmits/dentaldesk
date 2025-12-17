import { useMutation } from "@tanstack/react-query";

import { ADD_TREATMENT, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { AddTreatmentParams } from "@/lib/services/TreatmentService.types";


const useAddTreatmentMutation = () => {
  return useMutation({
    mutationKey: [TREATMENTS, ADD_TREATMENT],
    mutationFn: (newTreatment: AddTreatmentParams) => (
      treatmentService.addTreatment(newTreatment)
    )
  });
};

export default useAddTreatmentMutation;

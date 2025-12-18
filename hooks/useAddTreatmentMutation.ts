import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ADD_TREATMENT, GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { AddTreatmentParams } from "@/lib/services/TreatmentService.types";


const useAddTreatmentMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: [TREATMENTS, ADD_TREATMENT],
    mutationFn: (newTreatment: AddTreatmentParams) => (
      treatmentService.addTreatment(newTreatment)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TREATMENTS, GET_TREATMENTS] });
    }
  });
};

export default useAddTreatmentMutation;

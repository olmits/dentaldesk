import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ADD_TREATMENT, GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { AddTreatmentParams } from "@/lib/services/TreatmentService.types";
import { toast } from "sonner";


const useAddTreatmentMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: [TREATMENTS, ADD_TREATMENT],
    mutationFn: (newTreatment: AddTreatmentParams) => (
      treatmentService.addTreatment(newTreatment)
    ),
    onError: (error) => {
      console.error("Error in useAddTreatmentMutation:", error);
      toast.error("Failed to add treatment. Please try again.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TREATMENTS, GET_TREATMENTS] });
    }
  });
};

export default useAddTreatmentMutation;

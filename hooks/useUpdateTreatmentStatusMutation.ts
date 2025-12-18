import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GET_TREATMENTS, TREATMENTS, UPDATE_TREATMENT_STATUS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { TreatmentStatus } from "@/lib/types";


const useUpdateTreatmentStatusMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: [TREATMENTS, UPDATE_TREATMENT_STATUS],
    mutationFn: ({ status, treatmentId }: { status: TreatmentStatus; treatmentId: number }) => (
      treatmentService.updateTreatmentStatus(status, treatmentId)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TREATMENTS, GET_TREATMENTS] });
    }
  });
};

export default useUpdateTreatmentStatusMutation;
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GET_TREATMENTS, TREATMENTS, UPDATE_TREATMENT_STATUS } from "@/lib/constants/queryConstants";
import { treatmentService } from "@/lib/services/TreatmentService";
import { TreatmentStatus, Treatment } from "@/lib/types";
import { GetTreatmentsResponse } from "@/lib/services/TreatmentService.types";
import { useSearchStateContext } from "@/context/SearchProvider";
import { useFilterStateContext } from "@/context/FilterProvider";
import { toast } from "sonner";


const useUpdateTreatmentStatusMutation = () => {
  const queryClient = useQueryClient();

  const { search } = useSearchStateContext();
  const { status } = useFilterStateContext();
  
  const queryKey = [search, status].join("-");
  
  return useMutation({
    mutationKey: [TREATMENTS, UPDATE_TREATMENT_STATUS],
    mutationFn: ({ status, treatmentId }: { status: TreatmentStatus; treatmentId: number }) => (
      treatmentService.updateTreatmentStatus(status, treatmentId)
    ),
    onError: (error) => {
      console.error("Error in useUpdateTreatmentStatusMutation:", error);
      toast.error("Failed to update treatment status. Please try again.");
    },
    onSuccess: (updatedTreatment: Treatment) => {
      // Update the treatments list cache with the updated treatment
      queryClient.setQueryData<GetTreatmentsResponse>(
        [TREATMENTS, GET_TREATMENTS, queryKey], (oldData?: GetTreatmentsResponse) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((treatment: Treatment) =>
              treatment.id === updatedTreatment.id 
                ? updatedTreatment 
                : treatment
            ),
          };
        }
      );
      toast.success("Treatment status updated successfully");
    }
  });
};

export default useUpdateTreatmentStatusMutation;
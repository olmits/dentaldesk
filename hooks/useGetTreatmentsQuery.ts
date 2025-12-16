import { useQuery } from "@tanstack/react-query";

import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";


const useGetTreatmentsQuery = () => {
  return useQuery({
    queryKey: [TREATMENTS, GET_TREATMENTS],
    queryFn: () => treatmentService.getTreatments(),
  });
};

export default useGetTreatmentsQuery;
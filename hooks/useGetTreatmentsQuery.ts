import { useQuery } from "@tanstack/react-query";

import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { useSearchStateContext } from "@/context/SearchProvider";


const useGetTreatmentsQuery = () => {
  const { search } = useSearchStateContext();

  const queryKey = [search].join("-");

  return useQuery({
    queryKey: [TREATMENTS, GET_TREATMENTS, queryKey],
    queryFn: () => treatmentService.getTreatments({ search }),
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    retry: 3,
  });
};

export default useGetTreatmentsQuery;
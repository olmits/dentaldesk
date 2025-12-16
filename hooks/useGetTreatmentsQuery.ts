import { useQuery } from "@tanstack/react-query";

import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { useSearchStateContext } from "@/context/SearchProvider";
import { useFilterStateContext } from "@/context/FilterProvider";


const useGetTreatmentsQuery = () => {
  const { search } = useSearchStateContext();
  const { status } = useFilterStateContext();

  const queryKey = [search, status].join("-");

  return useQuery({
    queryKey: [TREATMENTS, GET_TREATMENTS, queryKey],
    queryFn: () => treatmentService.getTreatments({ search, status }),
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    retry: 3,
  });
};

export default useGetTreatmentsQuery;
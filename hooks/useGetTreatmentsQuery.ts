import { useQuery } from "@tanstack/react-query";

import { GET_TREATMENTS, TREATMENTS } from "@/lib/constants/queryKeys";
import { treatmentService } from "@/lib/services/TreatmentService";
import { useSearchStateContext } from "@/context/SearchProvider";
import { useFilterStateContext } from "@/context/FilterProvider";
import { usePaginationStateContext } from "@/context/PaginationProvider";


const useGetTreatmentsQuery = () => {
  const { page, pageSize } = usePaginationStateContext();
  const { search } = useSearchStateContext();
  const { status } = useFilterStateContext();

  const queryKey = [page, pageSize, search, status].join("-");

  return useQuery({
    queryKey: [TREATMENTS, GET_TREATMENTS, queryKey],
    queryFn: ({ signal }) => treatmentService.getTreatments({ search, status, page, pageSize }, signal),
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    retry: 3,
  });
};

export default useGetTreatmentsQuery;
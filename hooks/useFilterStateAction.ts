import { useFilterDispatchContext } from "@/context/FilterProvider";
import { FILTER_ACTIONS } from "@/lib/context/filterReducer";
import type { TreatmentStatus } from "@/lib/types";

export const useFilterStateAction = () => {
  const dispatch = useFilterDispatchContext();

  const setStatus = (status: TreatmentStatus | "all") => {
    dispatch({ type: FILTER_ACTIONS.SET_STATUS, payload: status });
  };

  const clearStatus = () => {
    dispatch({ type: FILTER_ACTIONS.CLEAR_STATUS });
  };

  return {
    setStatus,
    clearStatus,
  };
};

import { useSearchDispatchContext } from "@/context/SearchProvider";
import { SEARCH_ACTIONS } from "@/lib/context/searchReducer";

export const useSearchStateAction = () => {
  const dispatch = useSearchDispatchContext();

  const setSearch = (search: string) => {
    dispatch({ type: SEARCH_ACTIONS.SET_SEARCH, payload: search });
  };

  const clearSearch = () => {
    dispatch({ type: SEARCH_ACTIONS.CLEAR_SEARCH });
  };

  return {
    setSearch,
    clearSearch,
  };
};

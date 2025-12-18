import { usePaginationDispatchContext } from "@/context/PaginationProvider";
import { PAGINATION_ACTIONS } from "@/lib/context/paginationReducer";

export function usePaginationStateAction() {
  const dispatch = usePaginationDispatchContext();

  const setPage = (page: number) => {
    dispatch({ type: PAGINATION_ACTIONS.SET_PAGE, payload: page });
  };

  const setPageSize = (pageSize: number) => {
    dispatch({ type: PAGINATION_ACTIONS.SET_PAGE_SIZE, payload: pageSize });
  };

  const resetPagination = () => {
    dispatch({ type: PAGINATION_ACTIONS.RESET_PAGINATION });
  };

  // Helper methods for common pagination actions
  const nextPage = (currentPage: number) => {
    setPage(currentPage + 1);
  };

  const previousPage = (currentPage: number) => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = (totalPages: number) => {
    setPage(totalPages);
  };

  return {
    setPage,
    setPageSize,
    resetPagination,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
  };
}
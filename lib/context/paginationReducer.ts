// Action type constants
export const PAGINATION_ACTIONS = {
  SET_PAGE: 'SET_PAGE',
  SET_PAGE_SIZE: 'SET_PAGE_SIZE',
  RESET_PAGINATION: 'RESET_PAGINATION',
} as const;

export const DEFAULT_PAGE_SIZE = 9;

export interface PaginationState {
  page: number;
  pageSize: number;
}

export type PaginationAction = 
  | { type: typeof PAGINATION_ACTIONS.SET_PAGE; payload: number }
  | { type: typeof PAGINATION_ACTIONS.SET_PAGE_SIZE; payload: number }
  | { type: typeof PAGINATION_ACTIONS.RESET_PAGINATION; payload?: number };

export function paginationReducer(state: PaginationState, action: PaginationAction): PaginationState {
  switch (action.type) {
    case PAGINATION_ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case PAGINATION_ACTIONS.SET_PAGE_SIZE:
      return {
        ...state,
        page: 1,
        pageSize: action.payload,
      };
    case PAGINATION_ACTIONS.RESET_PAGINATION:
      return {
        ...state,
        page: 1,
      };
    default:
      return state;
  }
}
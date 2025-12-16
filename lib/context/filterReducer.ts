import type { TreatmentStatus } from "@/lib/types";

export const FILTER_ACTIONS = {
  SET_STATUS: 'SET_STATUS',
  CLEAR_STATUS: 'CLEAR_STATUS',
} as const;

export interface FilterState {
  status: TreatmentStatus | "all";
}

export type FilterAction = 
  | { type: typeof FILTER_ACTIONS.SET_STATUS; payload: TreatmentStatus | "all" }
  | { type: typeof FILTER_ACTIONS.CLEAR_STATUS };

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case FILTER_ACTIONS.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case FILTER_ACTIONS.CLEAR_STATUS:
      return {
        ...state,
        status: 'all',
      };
    default:
      return state;
  }
}
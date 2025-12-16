// Action type constants
export const SEARCH_ACTIONS = {
  SET_SEARCH: 'SET_SEARCH',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
} as const;

export interface SearchState {
  search: string;
}

export type SearchAction = 
  | { type: typeof SEARCH_ACTIONS.SET_SEARCH; payload: string }
  | { type: typeof SEARCH_ACTIONS.CLEAR_SEARCH };

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SEARCH_ACTIONS.CLEAR_SEARCH:
      return {
        ...state,
        search: '',
      };
    default:
      return state;
  }
}
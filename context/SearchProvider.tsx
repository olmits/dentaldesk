"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

import { searchReducer, SearchState, SearchAction } from "@/lib/context/searchReducer";

const SearchStateContext = createContext<SearchState | undefined>(undefined);
const SearchDispatchContext = createContext<React.Dispatch<SearchAction> | undefined>(undefined);


interface SearchProviderProps {
    defaultSearch?: string;
    children: ReactNode;
}

export function SearchProvider({ defaultSearch = "", children }: SearchProviderProps) {
  const initialState: SearchState = {
    search: defaultSearch,
  };
    
  const [state, dispatch] = useReducer(searchReducer, initialState);
    
  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

export const useSearchStateContext = () => {
  const context = useContext(SearchStateContext);
  if (!context) {
    throw new Error("useSearchStateContext must be used within a SearchProvider");
  }
  return context;
};

// Hook to use search dispatch
export const useSearchDispatchContext = () => {
  const context = useContext(SearchDispatchContext);
  if (!context) {
    throw new Error("useSearchDispatchContext must be used within a SearchProvider");
  }
  return context;
};

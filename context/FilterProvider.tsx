"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { filterReducer, FilterState, FilterAction } from "@/lib/context/filterReducer";
import type { TreatmentStatus } from "@/lib/types";

const FilterStateContext = createContext<FilterState | undefined>(undefined);
const FilterDispatchContext = createContext<React.Dispatch<FilterAction> | undefined>(undefined);


interface FilterProviderProps {
    defaultStatus?: TreatmentStatus | "all";
    children: ReactNode;
}

export function FilterProvider({ defaultStatus = "all", children }: FilterProviderProps) {
  const initialState: FilterState = {
    status: defaultStatus,
  };
    
  const [state, dispatch] = useReducer(filterReducer, initialState);
    
  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}

export const useFilterStateContext = () => {
  const context = useContext(FilterStateContext);
  if (context === undefined) {
    throw new Error("useFilterStateContext must be used within a FilterProvider");
  }
  return context;
};

export const useFilterDispatchContext = () => {
  const context = useContext(FilterDispatchContext);
  if (context === undefined) {
    throw new Error("useFilterDispatchContext must be used within a FilterProvider");
  }
  return context;
};

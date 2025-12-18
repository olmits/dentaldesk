"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

import { paginationReducer, PaginationState, PaginationAction, DEFAULT_PAGE_SIZE } from "@/lib/context/paginationReducer";

const PaginationStateContext = createContext<PaginationState | undefined>(undefined);
const PaginationDispatchContext = createContext<React.Dispatch<PaginationAction> | undefined>(undefined);


interface PaginationProviderProps {
    defaultPage?: number;
    defaultPageSize?: number;
    children: ReactNode;
}

export function PaginationProvider({ 
  defaultPage = 1, 
  defaultPageSize = DEFAULT_PAGE_SIZE,
  children 
}: PaginationProviderProps) {
  const initialState: PaginationState = {
    page: defaultPage,
    pageSize: defaultPageSize,
  };
    
  const [state, dispatch] = useReducer(paginationReducer, initialState);
    
  return (
    <PaginationStateContext.Provider value={state}>
      <PaginationDispatchContext.Provider value={dispatch}>
        {children}
      </PaginationDispatchContext.Provider>
    </PaginationStateContext.Provider>
  );
}

export function usePaginationStateContext() {
  const context = useContext(PaginationStateContext);
  if (context === undefined) {
    throw new Error("usePaginationStateContext must be used within a PaginationProvider");
  }
  return context;
}

export function usePaginationDispatchContext() {
  const context = useContext(PaginationDispatchContext);
  if (context === undefined) {
    throw new Error("usePaginationDispatchContext must be used within a PaginationProvider");
  }
  return context;
}
"use client";

import { useEffect } from "react";

import { usePaginationStateAction } from "@/hooks/usePaginationStateAction";
import { BREAKPOINTS } from "@/lib/constants/breakpoints";

import AddTreatment from "./AddTreatment/AddTreatment";
import TreatmentsSearch from "./TreatmentsSearch";
import TreatmentsFilter from "./TreatmentsFilter";
import TreatmentsCount from "./TreatmentsCount";
import TreatmentsList from "./TreatmentsList";
import TreatmentPagination from "./TreatmentsPagination";


export default function TreatmentsPageClient() {
  const { setPageSize } = usePaginationStateAction();

  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      
      let newPageSize: number;
      if (width >= BREAKPOINTS.xl) {
        newPageSize = 9;
      } else if (width >= BREAKPOINTS.md) {
        newPageSize = 8;
      } else {
        newPageSize = 6;
      }
      
      setPageSize(newPageSize);
    };

    updatePageSize();

    window.addEventListener("resize", updatePageSize);
    
    return () => window.removeEventListener("resize", updatePageSize);
  }, [setPageSize]);

  return (
    <>
      <section className="flex flex-col gap-4 rounded-lg border bg-card/40 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <TreatmentsSearch />
            <TreatmentsFilter />
          </div>
          <AddTreatment />
        </div>
        <TreatmentsCount />
      </section>
      <TreatmentsList />
      <TreatmentPagination />
    </>
  );
}

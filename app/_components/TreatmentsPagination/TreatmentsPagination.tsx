
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { usePaginationStateContext } from "@/context/PaginationProvider";
import { usePaginationStateAction } from "@/hooks/usePaginationStateAction";
import { generatePaginationItems } from "@/lib/utils";
import useGetTreatmentsQuery from "@/hooks/useGetTreatmentsQuery";

import { TreatmentsPaginationSkeleton } from "./TreatmentsPaginationSkeleton";

export default function TreatmentsPagination() {
  const { data, isLoading } = useGetTreatmentsQuery();

  const paginationState = usePaginationStateContext();
  const { setPage, nextPage, previousPage } = usePaginationStateAction();
  
  const { page } = paginationState;
  const totalPages = Math.ceil(data?.totalPages ?? 0);

  if (isLoading) {
    return <TreatmentsPaginationSkeleton />;
  }
  
  // Don't render if there's only one page or no items
  if (totalPages <= 1) {
    return null;
  }
  
  const paginationItems = generatePaginationItems(page, totalPages);
  
  const handlePrevious = () => {
    if (page > 1) {
      previousPage(page);
    }
  };
  
  const handleNext = () => {
    if (page < totalPages) {
      nextPage(page);
    }
  };
  
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={handlePrevious}
            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {paginationItems.map((item, index) => (
          <PaginationItem key={index}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageClick(item)}
                isActive={page === item}
                className="cursor-pointer"
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={handleNext}
            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
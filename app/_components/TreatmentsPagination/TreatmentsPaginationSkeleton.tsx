import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface PaginationSkeletonProps {
  className?: string;
}

export function TreatmentsPaginationSkeleton({ className }: PaginationSkeletonProps) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <Skeleton className="h-10 w-[86px]" />
        </PaginationItem>
        
        <PaginationItem>
          <Skeleton className="h-10 w-10" />
        </PaginationItem>
        <PaginationItem>
          <Skeleton className="h-10 w-10" />
        </PaginationItem>
        <PaginationItem>
          <Skeleton className="h-10 w-10" />
        </PaginationItem>
        <PaginationItem>
          <Skeleton className="h-6 w-6" />
        </PaginationItem>
        <PaginationItem>
          <Skeleton className="h-10 w-10" />
        </PaginationItem>
        
        <PaginationItem>
          <Skeleton className="h-10 w-[68px]" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
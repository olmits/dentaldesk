import { usePaginationStateContext } from "@/context/PaginationProvider";

import { TreatmentCardSkeleton } from "../TreatmentCard";

export default function TreatmentsListSkeleton() {
  const { pageSize } = usePaginationStateContext();
    
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: pageSize }).map((_, index) => (
        <TreatmentCardSkeleton key={index} />
      ))}
    </div>
  );
}
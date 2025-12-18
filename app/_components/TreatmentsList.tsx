import useGetTreatmentsQuery from "@/hooks/useGetTreatmentsQuery";

import TreatmentCard, { TreatmentCardSkeleton } from "./TreatmentCard";


export default function TreatmentsList() {
  const { data, isLoading } = useGetTreatmentsQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TreatmentCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data?.data.map((treatment, index) => (
        <TreatmentCard key={index} treatment={treatment} />
      ))}
    </div>
  );
};

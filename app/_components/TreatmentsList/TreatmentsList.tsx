import useGetTreatmentsQuery from "@/hooks/useGetTreatmentsQuery";

import TreatmentCard from "../TreatmentCard";
import TreatmentsListError from "./TreatmentsListError";
import TreatmentsListSkeleton from "./TreatmentsListSkeleton";


export default function TreatmentsList() {
  const { data, error, isLoading } = useGetTreatmentsQuery();

  if (isLoading) {
    return (
      <TreatmentsListSkeleton />
    );
  }

  if (error) {
    return <TreatmentsListError error={error} />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data?.data.map((treatment, index) => (
        <TreatmentCard key={index} treatment={treatment} />
      ))}
    </div>
  );
};

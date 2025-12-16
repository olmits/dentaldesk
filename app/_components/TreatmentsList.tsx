import useGetTreatmentsQuery from "@/hooks/useGetTreatmentsQuery";
import TreatmentCard from "./TreatmentCard";


export default function TreatmentsList() {
  const { data, isLoading } = useGetTreatmentsQuery();

  if (isLoading) {
    return <p className="text-center text-muted-foreground">Loading treatments...</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data?.data.map((treatment, index) => (
        <TreatmentCard key={index} treatment={treatment} />
      ))}
    </div>
  );
};

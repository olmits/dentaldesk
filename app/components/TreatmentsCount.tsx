import useGetTreatmentsQuery from "@/hooks/useGetTreatmentsQuery";
import { Skeleton } from "@/components/ui/skeleton";

const TreatmentsCount = () => {
  const { data, isLoading } = useGetTreatmentsQuery();

  if (isLoading) {
    return <Skeleton className="h-4 w-48" />;
  }
    
  return (
    <div className="text-sm text-muted-foreground">
        Showing {data?.pageSize || 0} of {data?.total || 0} treatments
    </div>
  );
};

export default TreatmentsCount;
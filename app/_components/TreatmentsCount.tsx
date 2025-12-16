import useGetTreatmentsQuery from "@/hooks/useGetTreatmentsQuery";
import { Skeleton } from "@/components/ui/skeleton";

const TreatmentsCount = () => {
  const { data, isLoading } = useGetTreatmentsQuery();

  if (isLoading) {
    return <Skeleton className="h-4 w-48" />;
  }

  if (!data || data.total === 0) {
    return (
      <div className="text-sm text-muted-foreground">No treatments found</div>
    );
  }
    
  return (
    <div className="text-sm text-muted-foreground">
        Showing {Math.min(data.pageSize, data.total)} of {data.total || 0} treatments
    </div>
  );
};

export default TreatmentsCount;
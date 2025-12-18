import { Skeleton } from "@/components/ui/skeleton";

export default function TreatmentCardSkeleton() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border bg-card p-6 space-y-3">
      <div className="flex flex-col gap-2 items-left">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-5 w-3/4" />
      </div>
      <div className="flex">
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
}
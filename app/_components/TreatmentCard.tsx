import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Treatment } from "@/lib/types";

interface TreatmentCardProps {
    treatment: Treatment
}

export function TreatmentCardSkeleton() {
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

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{treatment.patient}</CardTitle>
        <CardDescription>{treatment.procedure}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground">Dentist</div>
          <div className="text-sm font-medium">{treatment.dentist}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Date</div>
          <div className="text-sm font-medium">{treatment.date}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Status</div>
          <Badge className="mt-1 bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
            {treatment.status}
          </Badge>
        </div>
        {treatment.notes && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {treatment.notes}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer" variant="outline" size="sm">
              Update status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={treatment.status === "scheduled"}>
              Scheduled
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={treatment.status === "in_progress"}>
              In Progress
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={treatment.status === "completed"}>
              Completed
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Treatment } from "@/lib/types";
import TreatmentCardStatus from "./TreatmentCardStatus";

interface TreatmentCardProps {
    treatment: Treatment
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
        <TreatmentCardStatus status={treatment.status} treatmentId={treatment.id} />
      </CardFooter>
    </Card>
  );
}

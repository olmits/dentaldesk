import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUpdateTreatmentStatusMutation from "@/hooks/useUpdateTreatmentStatusMutation";
import { TreatmentStatus } from "@/lib/types";

interface TreatmentCardStatusProps {
  treatmentId: number;
  status?: TreatmentStatus;
}

export default function TreatmentCardStatus({ treatmentId, status }: TreatmentCardStatusProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateTreatmentStatusMutation();
  
  const handleStatusChange = (newStatus: TreatmentStatus) => {
    if (newStatus !== status) {
      mutate({ status: newStatus, treatmentId }, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          className="cursor-pointer" 
          variant="outline" 
          size="sm"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update status"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem 
          checked={status === "scheduled"}
          onCheckedChange={() => handleStatusChange("scheduled")}
          disabled={isPending}
        >
          Scheduled
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={status === "in_progress"}
          onCheckedChange={() => handleStatusChange("in_progress")}
          disabled={isPending}
        >
          In Progress
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={status === "completed"}
          onCheckedChange={() => handleStatusChange("completed")}
          disabled={isPending}
        >
          Completed
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TreatmentStatus } from "@/lib/types";

const STATUS_OPTIONS: Array<{ label: string; value: TreatmentStatus | "all" }> =
  [
    { label: "All", value: "all" },
    { label: "Scheduled", value: "scheduled" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

interface FilterTreatmentProps {
  status: TreatmentStatus | "all";
  onChangeStatus: (status: TreatmentStatus | "all") => void;
}

export default function FilterTreatment({ status, onChangeStatus }: FilterTreatmentProps) {
  return (
    <Select
      value={status}
      onValueChange={(value) =>
        onChangeStatus(value as TreatmentStatus | "all")
      }
    >
      <SelectTrigger className="md:w-[220px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
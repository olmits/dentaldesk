import { useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TreatmentFormField } from "@/lib/types";

interface AddTreatmentTextareaProps {
    id: string;
    name: TreatmentFormField;
    label: string;
    placeholder?: string;
}

export default function AddTreatmentTextarea({ id, name, placeholder, label }: AddTreatmentTextareaProps) {
  const { register } = useFormContext();

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} {...register(name)} />
    </div>
  );
}

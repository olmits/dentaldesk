import { useFormContext } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreatmentFormField } from "@/lib/types";

interface AddTreatmentInputProps {
    id: string;
    name: TreatmentFormField;
    label: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
}

export default function AddTreatmentInput({ id, name, placeholder, label, type = "text" }: AddTreatmentInputProps) {
  const { register } = useFormContext();

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} type={type} {...register(name)} />
    </div>
  );
}

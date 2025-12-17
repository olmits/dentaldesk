import { useFormContext } from "react-hook-form";
import { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreatmentFormData, TreatmentFormFieldEnum } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AddTreatmentInputProps extends Omit<ComponentProps<"input">, "name" | "value" | "onChange"> {
    name: TreatmentFormFieldEnum;
    label: string;
};

export default function AddTreatmentInput({ id, name, label, type = "text", className, ...rest }: AddTreatmentInputProps) {
  const { 
    register, 
    formState: { errors } 
  } = useFormContext<TreatmentFormData>();

  const error = errors[name];
  const hasError = !!error;

  return (
    <div className="grid gap-2">
      <Label 
        htmlFor={id}
        className={cn(
          hasError && "text-destructive"
        )}
      >
        {label}
      </Label>
      <Input 
        id={id} 
        type={type} 
        className={cn(
          hasError && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...rest} 
        {...register(name)} 
      />
      {hasError && (
        <p className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}

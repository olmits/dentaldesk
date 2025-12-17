import { useFormContext } from "react-hook-form";
import { ComponentProps } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TreatmentFormData, TreatmentFormFieldEnum } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AddTreatmentTextareaProps extends Omit<ComponentProps<"textarea">, "name" | "value" | "onChange"> {
    name: TreatmentFormFieldEnum;
    label: string;
}

export default function AddTreatmentTextarea({ id, name, label, className, ...rest }: AddTreatmentTextareaProps) {
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
      <Textarea 
        id={id} 
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

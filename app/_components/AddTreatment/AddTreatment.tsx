import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TREATMENT_FORM_ID } from "@/lib/constants/form";
import { TreatmentFormData } from "@/lib/types";
import useAddTreatmentMutation from "@/hooks/useAddTreatmentMutation";

import AddTreatmentForm from "./AddTreatmentForm";

export default function AddTreatment() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useAddTreatmentMutation();

  const handleSubmit = (data: TreatmentFormData) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add treatment</Button>
      </DialogTrigger>
      <DialogContent aria-description="Add a new treatment form">
        <DialogHeader>
          <DialogTitle>Add treatment</DialogTitle>
        </DialogHeader>

        <AddTreatmentForm onSubmit={handleSubmit} isLoading={isPending} />

        <DialogFooter>
          <Button form={TREATMENT_FORM_ID} type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending ? "Saving..." : "Save treatment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
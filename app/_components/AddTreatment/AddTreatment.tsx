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
import useAddTreatmentMutation from "@/hooks/useAddTreatmentMutation";

import AddTreatmentForm from "./AddTreatmentForm";

export default function AddTreatment() {
  const { mutate, isPending } = useAddTreatmentMutation();

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add treatment</Button>
      </DialogTrigger>
      <DialogContent aria-description="Add a new treatment form">
        <DialogHeader>
          <DialogTitle>Add treatment</DialogTitle>
        </DialogHeader>

        <AddTreatmentForm onSubmit={mutate} isLoading={isPending} />

        <DialogFooter>
          <Button form={TREATMENT_FORM_ID} type="submit" className="cursor-pointer" disabled={isPending}>Save treatment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
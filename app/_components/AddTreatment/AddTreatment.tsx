import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddTreatmentForm from "./AddTreatmentForm";
import { TREATMENT_FORM_ID } from "@/lib/constants/form";

export default function AddTreatment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add treatment</Button>
      </DialogTrigger>
      <DialogContent aria-description="Add a new treatment form">
        <DialogHeader>
          <DialogTitle>Add treatment</DialogTitle>
        </DialogHeader>

        <AddTreatmentForm />

        <DialogFooter>
          <Button form={TREATMENT_FORM_ID} type="submit">Save treatment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
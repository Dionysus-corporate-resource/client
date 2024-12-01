import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateProposalsDevelopmentForm from "./create-proposals-development-form";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateProposalsDevelopmentDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="ghost">
          <CircleX />
          Нашли ошибку?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CreateProposalsDevelopmentForm />
      </DialogContent>
    </Dialog>
  );
}

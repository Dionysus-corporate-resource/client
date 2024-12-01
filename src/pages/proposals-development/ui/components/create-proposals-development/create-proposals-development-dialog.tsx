import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateProposalsDevelopmentForm from "./create-proposals-development-form";

import { ReactNode } from "react";

export default function CreateProposalsDevelopmentDialog({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <CreateProposalsDevelopmentForm />
      </DialogContent>
    </Dialog>
  );
}

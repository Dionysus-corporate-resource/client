import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateProposalsDevelopmentForm from "./create-proposals-development-form";

import { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export default function CreateProposalsDevelopmentDialog({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <CreateProposalsDevelopmentForm />
      </DialogContent>
    </Dialog>
  );
}

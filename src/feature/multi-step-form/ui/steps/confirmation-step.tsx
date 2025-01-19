import { Check } from "lucide-react";

export function ConfirmationStep() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-primary p-3">
        <Check className="h-6 w-6 text-primary-foreground" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">
        Submission Successful!
      </h2>
      <p className="text-muted-foreground">
        Thank you for completing the form. We will be in touch shortly.
      </p>
    </div>
  );
}

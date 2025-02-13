import ProposalsForm from "@/feature/proposals/proposals-form";
import FeedbackList from "@/widgets/support/support-list";

export default function SupportPage() {
  return (
    <div className="w-full grid grid-cols-3">
      <FeedbackList />
      <ProposalsForm />
    </div>
  );
}

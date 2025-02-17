import ProposalsForm from "@/feature/proposals/proposals-form";
import FeedbackList from "@/widgets/support/support-list";
import { useState } from "react";

export default function ProposalsPage() {
  const [isOpenFeedBackForm, setIsOpenFeedBackForm] = useState(false);
  return (
    <div className="container mx-auto">
      <div className="lg:hidden">
        {isOpenFeedBackForm ? (
          <ProposalsForm setIsOpenFeedBackForm={setIsOpenFeedBackForm} />
        ) : (
          <FeedbackList setIsOpenFeedBackForm={setIsOpenFeedBackForm} />
        )}
      </div>
      <div className="hidden lg:grid grid-cols-3">
        <FeedbackList />
        <ProposalsForm setIsOpenFeedBackForm={setIsOpenFeedBackForm} />
      </div>
    </div>
  );
}

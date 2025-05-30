import { IUserDto } from "@/shared/model/types/user";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export default function BlockingCreateBooking({
  user,
}: {
  user: IUserDto | undefined;
}) {
  const navigate = useNavigate();
  const isShowBlocking = useMemo(() => {
    if (!user) return true;
    if (user?.activeSubscriptions.unLimitedBookingSubscription.isPurchased) {
      return false;
    }
    return !(user?.activeSubscriptions.purchasedBooking.remainingBookings > 0);
  }, [user]);

  if (isShowBlocking) {
    return (
      <div className="relative h-wull">
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] px-2">
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative bg-background rounded-[30px] max-w-3xl w-full  grid grid-cols-2 overflow-hidden shadow-lg">
            <div className="flex flex-col gap-24 p-8">
              <div className="flex flex-col gap-8 h-full">
                <span className="font-medium text-xs">Груз рынок.</span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-2xl">У вас 0 заявок</h4>
                  <span className="font-normal text-base">
                    Заявки не бесплатные, вы можете приобрести их на странице с
                    нашими тарифами
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/subscribe")}
                className="bg-[#64A5FE] rounded-[30px] px-6 py-4 font-semibold text-base text-white w-fit"
              >
                Купить заявки
              </button>
            </div>
            <div className="w-full max-h-96 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629761363564-40920873fd29?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import { useNavigate } from "react-router";
import { Progress } from "@/shared/components/ui/progress";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [lineRedirect, setLineRedirect] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setLineRedirect((prev) => prev - 1);
    }, 100);

    return () => clearInterval(timeInterval);
  }, []);
  useEffect(() => {
    if (lineRedirect <= 0) {
      navigate("/profile");
    }
  }, [lineRedirect, navigate]);

  return (
    <div className="relative h-wull">
      <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] px-2">
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative max-w-lg w-full bg-background border rounded-[30px] p-8 flex flex-col gap-8 shadow-lg">
          <span>Груз рынок</span>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-2xl">Вы вернулись на сайт</h4>
            <span className="font-normal text-base">
              Если вы оплатили покупку, она должна появиться в вашем профиле в
              течении нескольких минут.
            </span>
          </div>
          <div className="mt-10">
            <Progress value={lineRedirect} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

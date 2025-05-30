import { Timer } from "lucide-react";
import { useNavigate } from "react-router";

export default function CreateBookingCard({
  title,
  description,
  time,
  link,
}: {
  title: string;
  description: string;
  time: string;
  link: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 p-8 bg-primary/5 rounded-[30px] max-w-2xl">
      <div className="flex flex-col gap-1 pr-40">
        <h3 className="text-2xl font-medium">{title}</h3>
        <span className="text-base font-normal text-primary/60">
          {description}
        </span>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <Timer className="text-primary/60 w-5 h-5" />
          <span className="text-sm font-normal text-primary/60">
            {time} минут
          </span>
        </div>
        <button
          onClick={() => navigate(link)}
          className="bg-[#62A3FC] text-background text-base font-semibold px-6 py-4 rounded-[30px]"
        >
          Создать заявку
        </button>
      </div>
    </div>
  );
}

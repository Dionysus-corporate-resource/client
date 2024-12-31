import { Button } from "@/components/ui/button";
import { BookUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlaceholderBookingCard() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full items-center justify-center rounded-md border  cursor-pointer">
      <div className="w-full h-full  text-start grid grid-cols-2 gap-8 items-center">
        <div className="flex justify-center w-full h-[258px]">
          <img
            src="https://images.unsplash.com/photo-1611746351408-c0a1346be8e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Booking Placeholder"
            className="w-full object-cover rounded-md"
            style={{ borderRadius: "4px 0 0 4px" }}
          />
        </div>

        <div className="flex flex-col gap-2 max-w-xs ">
          <span className="text-xl">
            Вы еще не поставили ни одного рейса на заявку
          </span>
          <span className="text-muted-foreground mb-2">
            Чтобы карточки появились, нужно поставить машины (рейс) хотя бы на
            одну из них
          </span>
          <Button
            size="sm"
            variant="link"
            className="transition-all w-fit"
            onClick={() => navigate("/product")}
          >
            <BookUp />
            Смотреть заявки
          </Button>
        </div>
      </div>
    </div>
  );
}

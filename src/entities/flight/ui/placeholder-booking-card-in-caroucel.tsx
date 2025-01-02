import { Button } from "@/components/ui/button";
import { IdCard } from "lucide-react";

type Props = {
  url: string;
  title: string;
  description: string;
};

export default function PlaceholderBookingCardInCarousel({
  url,
  title,
  description,
}: Props) {
  return (
    <div className="w-full h-full shadow-sm rounded-md border border-dashed flex items-center justify-center">
      <div className="flex items-center justify-center w-full h-full gap-8">
        <div className="relative w-1/2 h-full overflow-hidden">
          <img
            src={url}
            alt="Иллюстрация пустого состояния"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-medium text-gray-900 max-w-md">
            {title}
          </h3>
          <p className="text-sm text-gray-500 max-w-md">{description}</p>
          {/* <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm">
              <IdCard className="h-4 w-4" />
              Документация
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

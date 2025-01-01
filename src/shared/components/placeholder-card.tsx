import { Button } from "@/components/ui/button";
import { IdCard } from "lucide-react";

type Props = {
  url: string;
  title: string;
  description: string;
};

export default function PlaceholderCard({ url, title, description }: Props) {
  return (
    <div
      className="w-full
      shadow-sm rounded-md border border-dashed
      "
    >
      <div className="flex gap-8 items-center justify-center p-2">
        <div className="relative w-64 h-64">
          <img
            src={url}
            alt="Иллюстрация пустого состояния"
            className="object-contain"
          />
        </div>
        <div className="space-y-2">
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
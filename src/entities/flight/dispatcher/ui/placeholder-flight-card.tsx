import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmptyDriverCard() {
  return (
    <Card className="w-full transition-all duration-200 hover:shadow-sm">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="relative w-64 h-64 mb-6">
          <img
            src="https://i.pinimg.com/736x/3b/b2/a6/3bb2a6b536138f60b797cc5e08523880.jpg"
            alt="Иллюстрация пустого состояния"
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Кликните по любой из карточек, чтобы рейсы отобразились на этом месте
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          Вы так-же можете поставить машины на рейс, для этого читайте наше
          руководство по использованию
        </p>
      </CardContent>
    </Card>
  );
}

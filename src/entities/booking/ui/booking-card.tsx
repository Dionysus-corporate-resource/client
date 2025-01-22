import { MapPin, Info } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
// import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ReactNode } from "react";

interface ProductCardProps {
  location?: string;
  region?: string;
  distance?: string;
  product?: string;
  destination?: string;
  seller?: string;
  price?: number;
  hasRatings?: boolean;
  bookingDetailSlot: ReactNode;
}

export default function BookingCard({
//   location = "Тоцкое",
//   region = "Оренбургская область",
//   distance = "1400 км",
//   product = "Кукуруза",
//   destination = "Астрахань г",
//   seller = "ИП Нерсесян",
//   price = 3.4,
  bookingDetailSlot,
  // hasRatings = false,
}: ProductCardProps) {
    const location = "Тоцкое"
    const region = "Оренбургская область"
    const distance = "1400 км"
    const product = "Кукуруза"
    const destination = "Астрахань г"
    const seller = "ИП Нерсесян"
    const price = 3.4
  return (
    <Card className="w-full max-w-md relative">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-lg">{location}</h3>
              <p className="text-sm text-muted-foreground">{region}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 ml-6">
            <Badge variant="secondary" className="rounded-full">
              {distance}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {product}
            </Badge>
          </div>

          {/* Unloading Location */}
          <div className="">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <h3 className="font-medium text-lg">Место выгрузки не указано</h3>
            </div>
            <p className="text-sm text-muted-foreground">{destination}</p>
            <div className="border-l h-16 border-dashed absolute top-14 left-8" />
          </div>

          {/* Destination & Seller */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{seller}</p>
              <Badge variant="outline" className="text-muted-foreground">
                Нет оценок
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="border-b" />
      <CardFooter className="flex items-center justify-between pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Цена:</p>
          <p className="text-lg font-semibold text-primary">{price} ₽/кг</p>
        </div>
        {bookingDetailSlot}
      </CardFooter>
    </Card>
  );
}

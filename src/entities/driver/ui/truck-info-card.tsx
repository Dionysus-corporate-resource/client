import { Card } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

interface TruckInfoProps {
  imageUrl?: string;
  volume?: string;
  axles?: string;
  type?: string;
  unloadingType?: string;
  capacity?: string;
  pricePerKm?: string;
  isAvailable?: boolean;
  location?: string;
}

export default function TruckInfoCard({
  imageUrl = "https://images.unsplash.com/photo-1616340786004-7c444e530ce3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  volume = "30 кубов",
  axles = "6-осная",
  type = "Фура",
  unloadingType = "Задняя",
  capacity = "20 тонн",
  pricePerKm = "85₽/км",
  // isAvailable = true,
  // location = "Москва",
}: TruckInfoProps) {
  return (
    <Card className="overflow-hidden border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <div className="flex flex-col sm:flex-row bg-gradient-to-r from-background to-muted/30">
        <div className="relative max-h-48  sm:w-1/3 md:w-1/4 overflow-hidden">
          {/* <div className="absolute top-2 left-2 z-10">
            <Badge
              variant={isAvailable ? "default" : "secondary"}
              className="shadow-sm"
            >
              {isAvailable ? "Доступен" : "Занят"}
            </Badge>
          </div> */}
          <img
            src={imageUrl}
            alt="Грузовой автомобиль"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg">{type}</h3>
              {/* <p className="text-sm text-muted-foreground">{location}</p> */}
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-primary">{pricePerKm}</p>
              <p className="text-sm text-muted-foreground">за километр</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-sm font-normal text-muted-foreground">
                Кубатура
              </p>
              <p className="mt-1">{volume}</p>
            </div>

            <div>
              <p className="text-sm font-normal text-muted-foreground">Оси</p>
              <p className="mt-1">{axles}</p>
            </div>

            <div>
              <p className="text-sm font-normal text-muted-foreground">
                Грузоподъемн.
              </p>
              <p className="mt-1">{capacity}</p>
            </div>

            <div>
              <p className="text-sm font-normal text-muted-foreground">
                Выгрузка
              </p>
              <p className="mt-1">{unloadingType}</p>
            </div>
          </div>

          {/* <Separator className="my-4" /> */}

          {/* <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/5">
                Международные перевозки
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                Страхование груза
              </Badge>
            </div>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              Подробнее →
            </button>
          </div> */}
        </div>
      </div>
    </Card>
  );
}

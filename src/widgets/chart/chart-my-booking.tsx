import { Ticket } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "../../pages/home/api/query-option";
import { useMemo } from "react";

const chartConfig = {
  visitors: {
    label: "Booking",
  },
  chrome: {
    label: "Активные",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "В архиве",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartMyBooking() {
  const { data: bookingData } = useQuery(bookingQueryOption.getAll());
  const user = useAtomValue(userStorageAtom);
  const today = new Date();

  // Проверяем, что user?.createdAt существует и является корректной датой
  const userCreatedAt = user?.createdAt ? new Date(user.createdAt) : today;

  // Форматируем дату создания пользователя
  const formattedDateCreateUser = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(userCreatedAt);

  // Форматируем текущую дату
  const formattedDate = today.toLocaleDateString("ru-RU", {
    day: "numeric", // День
    month: "long", // Название месяца
    year: "numeric", // Год
  });

  // const allBookingUser = bookingData?.filter((booking) => booking?.user?._id === user?._id)
  const tableDataActive = bookingData
    ?.filter((booking) => booking?.user === user?._id)
    .filter((booking) => booking?.status === "active");
  const tableDataArchive = bookingData
    ?.filter((booking) => booking?.user === user?._id)
    .filter((booking) => booking?.status === "inactive");

  const chartData = [
    {
      browser: "Активные",
      visitors: tableDataActive?.length ?? 0,
      fill: "var(--color-chrome)",
    },
    {
      browser: "В архиве",
      visitors: tableDataArchive?.length ?? 0,
      fill: "var(--color-safari)",
    },
  ];

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [bookingData]);

  return (
    <Card
      className="flex-col
      hidden 2xl:flex"
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>Статистика за период</CardTitle>
        <CardDescription>
          {formattedDateCreateUser} - {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Заявки
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Заявок
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent> */}
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex items-start gap-2 font-medium leading-none">
          Ваши созданные заявки <Ticket className="h-4 w-4" />
        </div>
        <div className="leading-none text-start text-muted-foreground">
          Отслеживайте Активные заявки, и те что находяться в архиве
        </div>
      </CardFooter>
    </Card>
  );
}

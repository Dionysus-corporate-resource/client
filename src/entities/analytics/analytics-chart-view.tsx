import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

const chartConfig = {
  // views: {
  //   label: "Page Views",
  // },
  countView: {
    label: "Просмотры",
    color: "hsl(var(--chart-1))",
  },
  newUser: {
    label: "Новые пользователи",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export type TViewChart = {
  hour: number;
  countView: number;
  newUser: number;
};

export function AnaliticsChartView({ viewData }: { viewData: TViewChart[] }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof TViewChart>("countView");

  const total = React.useMemo(
    () => ({
      countView: viewData.reduce((acc, curr) => acc + curr.countView, 0),
      newUser: viewData.reduce((acc, curr) => acc + curr.newUser, 0),
    }),
    [viewData],
  );

  return (
    <Card>
      <CardHeader className="container flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Таблица статистики просмотров</CardTitle>
          <CardDescription>
            В будущем добавится переключение по конкреным дням
          </CardDescription>
        </div>
        <div className="flex">
          {["countView", "newUser"].map((key) => {
            const chart = key as keyof Omit<TViewChart, "hour">;
            // const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={viewData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return `${value}:00 ч`;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  // labelFormatter={(value) => {
                  //   return new Date(value).toLocaleDateString("en-US", {
                  //     month: "short",
                  //     day: "numeric",
                  //     year: "numeric",
                  //   });
                  // }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

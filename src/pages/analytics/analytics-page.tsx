import { AnaliticsChartView, AnalyticsShortCard } from "@/entities/analytics";
import useViewStatsDay from "./hooks/use-view-stats-day";
import { TViewChart } from "@/entities/analytics/analytics-chart-view";
import { Eye, User } from "lucide-react";

export default function AnalyticsPage() {
  const { views } = useViewStatsDay();
  function mapingAllCountView(views: { _id: number; count: number }[]) {
    return views?.reduce((acc, item) => acc + item.count, 0);
  }
  function mapingCorrectHourView(
    views: { _id: number; count: number }[],
  ): TViewChart[] {
    return views?.map((item) => ({
      countView: item.count,
      newUser: 0,
      hour: item._id + 3,
    }));
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid gap-4 grid-cols-1">
        <AnaliticsChartView viewData={mapingCorrectHourView(views)} />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsShortCard
          label="Просмотры"
          count={mapingAllCountView(views)}
          icon={Eye}
        />
        <AnalyticsShortCard
          label="Пользователи"
          count={mapingAllCountView(views)}
          icon={User}
        />
      </div>
    </div>
  );
}

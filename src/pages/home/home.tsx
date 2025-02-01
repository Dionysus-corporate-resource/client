import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import FilterPanel from "@/feature/filter-panel/filter-panel";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Checkbox } from "@/shared/components/ui/checkbox";

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="mx-auto flex flex-col flex-1 px-6 gap-2 pt-4 ">
      <Tabs defaultValue={location.pathname}>
        <div className="flex gap-6 justify-between">
          <div className="flex gap-6">
            <TabsList>
              <TabsTrigger
                value="/table-view"
                className="space-x-2"
                onClick={() => navigate("/table-view")}
              >
                <span>Список</span>
              </TabsTrigger>
              <TabsTrigger
                value="/"
                className="space-x-2"
                onClick={() => navigate("")}
              >
                <span>Карта</span>
              </TabsTrigger>

              <TabsTrigger
                value="/card-view"
                className="space-x-2"
                onClick={() => navigate("/card-view")}
              >
                <span>Карточки</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2 mr-2">
              <Checkbox
              // checked={} onCheckedChange={}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Включить расширенный поиск
              </label>
            </div>
          </div>
          {/* Панель сортировки (или лучше инфу о подписках) */}
          <FilterPanel />
        </div>
      </Tabs>
      {/* // Страниы */}
      <div className="space-y-4 borde border-pink-600 h-full ">
        <div className="flex justify-between">
          <FilterPanel />
          <div className="flex gap-4">
            <div className="flex items-center space-x-2 mr-2">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Посик по актульному
              </label>
              <Checkbox
              // checked={} onCheckedChange={}
              />
            </div>
            <div className="flex items-center space-x-2 mr-2">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Дер.мовозам
              </label>
              <Checkbox
              // checked={} onCheckedChange={}
              />
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">

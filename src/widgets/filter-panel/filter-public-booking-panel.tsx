import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Dispatch, SetStateAction } from "react";

export default function FilterPublicBookingPanel({
  filters,
  setFilters,
  resetFiltredValue,
}: {
  filters: {
    loadingLocationFilter: string;
    unLoadingLocationFilter: string;

    // companyNameFilter: string;
    cultureFilter: string;
    // date: DateRange | undefined;
  };
  setFilters: {
    setLoadingLocationFilter: Dispatch<SetStateAction<string>>;
    setUnLoadingLocationFilter: Dispatch<SetStateAction<string>>;
    // setCompanyNameFilter: Dispatch<SetStateAction<string>>;
    setCultureFilter: Dispatch<SetStateAction<string>>;
    // setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  };
  resetFiltredValue: () => void;
  // uniqueListCompany: string[];
}) {
  return (
    <div className="bg-background py-4 px-6 rounded-2xl grid grid-cols-4 items-end gap-4">
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">погрузка</Label>
        <Input
          placeholder="Ростов-на-Дону"
          className="border bg-background py-6 px-5 rounded-xl text-sm font-normal"
          value={filters.loadingLocationFilter}
          onChange={(e) => setFilters.setLoadingLocationFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">выгрузка</Label>
        <Input
          placeholder="Азов"
          className="border bg-background py-6 px-5 rounded-xl text-sm font-normal"
          value={filters.unLoadingLocationFilter}
          onChange={(e) =>
            setFilters.setUnLoadingLocationFilter(e.target.value)
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          культура/груз
        </Label>
        <Input
          placeholder="Пшеница"
          className="border bg-background py-6 px-5 rounded-xl text-sm font-normal"
          value={filters.cultureFilter}
          onChange={(e) => setFilters.setCultureFilter(e.target.value)}
        />
      </div>
      {/* <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          период погрузки
        </Label>
        <Input
          placeholder="13 Марта"
          className="border bg-background py-6 px-5 rounded-xl text-sm font-normal"
        />
      </div> */}
      {/* <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">заказчик</Label>
        <Input
          placeholder="Все заказчики"
          className="border bg-background py-6 px-5 rounded-xl text-sm font-normal"
        />
      </div> */}
      <Button
        type="submit"
        className="w-full py-6 px-5 rounded-xl bg-[hsl(var(--access-primary))]"
        onClick={resetFiltredValue}
      >
        Отчистить фильтры
      </Button>
    </div>
  );
}

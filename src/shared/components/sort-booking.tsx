import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IBookingDto } from "../model/types/booking";

type IsortDataTypes = {
  inputValue: string;
  selectValue: {
    type: "generalInformation" | "location" | "manager";
    value: "cargoName" | "loadingLocation" | "unloadingLocation" | "userName";
  };
};
export type ISelectOptions = {
  label: string;
  value: IsortDataTypes["selectValue"]["value"];
};
type Iprops = {
  bookings: IBookingDto[] | undefined;
  setSortItems: (sortItems: IBookingDto[]) => void;
  selectOptions: ISelectOptions[];
};

export default function SortBooking({
  bookings,
  setSortItems,
  selectOptions,
}: Iprops) {
  const [sortData, setSortData] = useState<IsortDataTypes>({
    inputValue: "",
    selectValue: {
      type: "generalInformation",
      value: "cargoName",
    },
  });

  useEffect(() => {
    if (!bookings) return;

    const sortedItems = bookings.filter((booking) => {
      const typeKey = sortData.selectValue.type;
      const valueKey = sortData.selectValue.value;

      const typeField = booking[typeKey as keyof IBookingDto];

      if (typeField && typeof typeField === "object" && valueKey in typeField) {
        const field = (typeField as Record<string, unknown>)[valueKey];
        if (typeof field === "string") {
          return field
            .toLowerCase()
            .includes(sortData.inputValue.toLowerCase());
        }
      }

      return false;
    });

    setSortItems(sortedItems);
  }, [sortData, bookings]);

  const handleSelectChange = (
    value: IsortDataTypes["selectValue"]["value"],
  ) => {
    // console.log(sortData.selectValue.type, value);
    switch (value) {
      case "cargoName": {
        return setSortData((prev) => ({
          ...prev,
          selectValue: { type: "generalInformation", value },
        }));
      }
      case "loadingLocation": {
        // if (value === "loadingLocation") {
        //   return setSortData(prev => ({ ...prev, selectValue: {type:"location", value}}))
        // }
        return setSortData((prev) => ({
          ...prev,
          selectValue: { type: "location", value },
        }));
      }

      case "unloadingLocation": {
        return setSortData((prev) => ({
          ...prev,
          selectValue: { type: "location", value },
        }));
      }
      case "userName": {
        return setSortData((prev) => ({
          ...prev,
          selectValue: { type: "manager", value },
        }));
      }
    }
  };

  return (
    <div className="flex">
      <Select
        value={sortData.selectValue.value}
        onValueChange={(value: IsortDataTypes["selectValue"]["value"]) =>
          handleSelectChange(value)
        }
      >
        <SelectTrigger
          className="h-8 w-[300px]"
          style={{
            // borderRight: "none",

            borderRadius: "8px 0 0 8px",
          }}
        >
          <SelectValue placeholder="Название груза" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Критерии поиска</SelectLabel>
            {selectOptions.map((option) => (
              <SelectItem value={option.value}>{option.label}</SelectItem>
            ))}
            {/* <SelectItem value={"cargoName"}>Название груза</SelectItem>
            <SelectItem value={"loadingLocation"}>Адрес погрузки</SelectItem>
            <SelectItem value={"unloadingLocation"}>Адрес выгрузки</SelectItem>
            <SelectItem value={"userName"}>Менеджер</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className="h-8"
        placeholder="Поиск по критериям"
        style={{
          borderRadius: "0 8px 8px 0",
          borderLeft: "none",
        }}
        value={sortData.inputValue}
        onChange={(e) =>
          setSortData((prev) => ({ ...prev, inputValue: e.target.value }))
        }
      />
    </div>
  );
}

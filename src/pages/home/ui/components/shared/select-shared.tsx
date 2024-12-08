import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ValidCarTypes,
  ValidUnloadingTypes,
} from "@/shared/model/types/booking";

type ISelect = {
  icon: string;
  loadingType: "normal" | "full";
  paymentMethod: "NDS" | "without_NDS" | "cash";
  period: "loading" | "un_loading";
  carType: ValidCarTypes;
  carTypeUnLoading: ValidUnloadingTypes;
  carPeriod: "Каждый_день" | "Общее";
};

type IProps = {
  options: {
    label: string;
    array: {
      value: string;
      option: string;
    }[];
  };
  formDataValue: ISelect[keyof ISelect];
  name: keyof ISelect;
  handleSelectChange: (name: string, value: string) => void;
  className?: string;
};

export function SelectShared({
  options,
  handleSelectChange,
  formDataValue,
  name,
  className,
}: IProps) {
  return (
    <Select
      value={formDataValue}
      onValueChange={(value) => handleSelectChange(name, value)}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={options.array[0].option} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{options.label}</SelectLabel>
          {options?.array?.map((obj) => (
            <SelectItem key={obj.option} value={obj.value}>
              {obj.option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

import { ChevronRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps, ReactNode } from "react";

const iconMap = {
  ChevronRight: ChevronRight,
  Sun: Sun,
};

const stylesButton = {
  small: "px-2",
  middle: "px-4",
};

type ButtonProps = {
  children?: ReactNode;
  variantIcons?: keyof typeof iconMap;
  styleButton?: keyof typeof stylesButton;
  theme?: "light" | "dark";
  actions?: (data?: unknown) => void;
} & ComponentProps<typeof Button>;

export function ButtonIcon({
  children,
  variantIcons,
  theme,
  styleButton,
  actions,
  ...rest
}: ButtonProps) {
  const ChooseIcon = variantIcons ? iconMap[variantIcons] : null;

  return (
    <Button
      className={`px-2 ${stylesButton[styleButton ?? "small"]}`}
      onClick={actions}
      {...rest}
    >
      {theme == "dark" ? "light" : "dark"}
      {children}
      {ChooseIcon && <ChooseIcon />}
    </Button>
  );
}

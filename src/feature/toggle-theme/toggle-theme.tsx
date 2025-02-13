import { Button } from "@/shared/components/ui/button";
import useTheme from "@/shared/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="text-"
      variant="secondary"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <>
          <Moon className="w-4 h-4" />
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
        </>
      )}
    </Button>
  );
}

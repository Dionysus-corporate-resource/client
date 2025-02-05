import useTheme from "@/shared/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="[color:hsl(var(--muted-foreground))]"
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
    </button>
  );
}

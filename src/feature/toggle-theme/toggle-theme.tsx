import { Button } from "@/shared/components/ui/button";
import useTheme from "@/shared/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="sm"
      variant="secondary"
      className="[color:hsl(var(--muted-foreground))] mb-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <>
          Темная тема
          <Moon />
        </>
      ) : (
        <>
          Светлая тема
          <Sun />
        </>
      )}
    </Button>
  );
}

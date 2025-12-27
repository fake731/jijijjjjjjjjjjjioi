import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;
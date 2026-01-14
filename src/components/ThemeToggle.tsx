import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme, colorThemes } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const ThemeToggle = () => {
  const { theme, colorTheme, toggleTheme, setColorTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Color Theme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            aria-label="اختر اللون"
          >
            <Palette className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-center">اختر الثيم</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {colorThemes.map((ct) => (
            <DropdownMenuItem
              key={ct.id}
              onClick={() => setColorTheme(ct.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full border-2 border-border"
                  style={{ backgroundColor: ct.color }}
                />
                <span>{ct.nameAr}</span>
              </div>
              {colorTheme === ct.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Light/Dark Toggle */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
        aria-label={theme === "dark" ? "تبديل للوضع الفاتح" : "تبديل للوضع الداكن"}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "dark" | "light";
export type ColorTheme = "blue" | "red" | "green" | "purple" | "orange";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const colorThemes: { id: ColorTheme; name: string; nameAr: string; color: string }[] = [
  { id: "blue", name: "Electric Blue", nameAr: "أزرق كهربائي", color: "#00BFFF" },
  { id: "red", name: "Cyber Red", nameAr: "أحمر سايبر", color: "#FF3B3B" },
  { id: "green", name: "Matrix Green", nameAr: "أخضر ماتريكس", color: "#00FF66" },
  { id: "purple", name: "Neon Purple", nameAr: "بنفسجي نيون", color: "#A855F7" },
  { id: "orange", name: "Fire Orange", nameAr: "برتقالي ناري", color: "#FF6B00" },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "dark";
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem("colorTheme");
    return (stored as ColorTheme) || "blue";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-blue", "theme-red", "theme-green", "theme-purple", "theme-orange");
    root.classList.add(`theme-${colorTheme}`);
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, toggleTheme, setTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
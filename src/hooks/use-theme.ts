import { useEffect } from "react";
import { useAppStore } from "@/stores/app";

// Theme color definitions using oklch for better color mixing
const THEME_COLORS: Record<string, { primary: string; primaryForeground: string }> = {
  red: { primary: "oklch(57.7% 0.245 27.325deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  orange: { primary: "oklch(70.8% 0.189 41.116deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  amber: { primary: "oklch(76.8% 0.145 70deg)", primaryForeground: "#fafafa" },
  yellow: { primary: "oklch(87.8% 0.157 85deg)", primaryForeground: "#fafafa" },
  lime: { primary: "oklch(72.8% 0.219 130deg)", primaryForeground: "#fafafa" },
  green: { primary: "oklch(64.6% 0.222 145deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  emerald: { primary: "oklch(60.8% 0.17 162.48deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  teal: { primary: "oklch(54.6% 0.123 182.412deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  cyan: { primary: "oklch(57.7% 0.189 229.62deg)", primaryForeground: "#fafafa" },
  sky: { primary: "oklch(54.6% 0.211 248.052deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  blue: { primary: "oklch(48.8% 0.243 264.376deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  indigo: { primary: "oklch(48.8% 0.243 264.376deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  violet: { primary: "oklch(55.6% 0.245 293.312deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  purple: { primary: "oklch(62.8% 0.246 302.217deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  fuchsia: { primary: "oklch(62.7% 0.265 303.9deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  pink: { primary: "oklch(67.7% 0.231 342.308deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
  rose: { primary: "oklch(70.4% 0.191 22.216deg)", primaryForeground: "oklch(98.5% 0 0deg)" },
};

/**
 * Apply theme color CSS variables to the document
 */
export function applyThemeColor(colorKey: string) {
  const color = THEME_COLORS[colorKey];
  if (!color) return;

  const root = document.documentElement;
  root.style.setProperty("--primary", color.primary);
  root.style.setProperty("--primary-foreground", color.primaryForeground);
  
  // Also update sidebar primary
  root.style.setProperty("--sidebar-primary", color.primary);
  root.style.setProperty("--sidebar-primary-foreground", color.primaryForeground);
  
  // Update ring color to match primary
  root.style.setProperty("--ring", color.primary);
}

/**
 * Apply theme (light/dark/system) to the document
 */
export function applyTheme(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  
  // Remove existing theme classes
  root.classList.remove("light", "dark");
  root.removeAttribute("data-theme");

  if (theme === "system") {
    // Detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  } else {
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
  }
}

/**
 * Hook to sync theme settings with the document
 */
export function useThemeSync() {
  const theme = useAppStore((s) => s.settings.theme);
  const themeColor = useAppStore((s) => s.settings.themeColor);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyThemeColor(themeColor);
  }, [themeColor]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);
}

/**
 * Initialize theme on app load
 */
export function initializeTheme() {
  const settings = useAppStore.getState().settings;
  applyTheme(settings.theme);
  applyThemeColor(settings.themeColor);
}

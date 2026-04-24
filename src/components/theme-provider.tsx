import { useEffect } from "react";
import { useThemeSync, initializeTheme } from "@/hooks/use-theme";

/**
 * Theme provider component - wrap your app with this to enable theme support
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, []);

  // Sync theme with document
  useThemeSync();

  return <>{children}</>;
}

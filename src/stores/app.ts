import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyTheme, applyThemeColor } from "@/hooks/use-theme";

interface AppSettings {
  autoSave: boolean;
  theme: "system" | "light" | "dark";
  themeColor: string;
}

interface AppState {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  autoSave: true,
  theme: "system",
  themeColor: "amber",
};

// Helper to update settings and apply theme changes
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: { ...defaultSettings },
      updateSettings: (partial) => {
        set((state) => {
          const newSettings = { ...state.settings, ...partial };
          
          // Apply theme changes immediately
          if (partial.theme !== undefined) {
            applyTheme(partial.theme);
          }
          if (partial.themeColor !== undefined) {
            applyThemeColor(partial.themeColor);
          }
          
          return { settings: newSettings };
        });
      },
      resetSettings: () => {
        applyTheme(defaultSettings.theme);
        applyThemeColor(defaultSettings.themeColor);
        set({ settings: { ...defaultSettings } });
      },
    }),
    {
      name: "app-setting",
    },
  ),
);

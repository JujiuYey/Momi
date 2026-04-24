import { cn } from "@/lib/utils";

// Theme color options for the selector
const themeColors = [
  { value: "red", label: "红色", preview: "#ef4444" },
  { value: "orange", label: "橙色", preview: "#f97316" },
  { value: "amber", label: "琥珀", preview: "#f59e0b" },
  { value: "yellow", label: "黄色", preview: "#eab308" },
  { value: "lime", label: "青柠", preview: "#84cc16" },
  { value: "green", label: "绿色", preview: "#22c55e" },
  { value: "emerald", label: "翡翠", preview: "#10b981" },
  { value: "teal", label: "青色", preview: "#14b8a6" },
  { value: "cyan", label: "蓝绿", preview: "#06b6d4" },
  { value: "sky", label: "天蓝", preview: "#0ea5e9" },
  { value: "blue", label: "蓝色", preview: "#3b82f6" },
  { value: "indigo", label: "靛蓝", preview: "#6366f1" },
  { value: "violet", label: "紫罗兰", preview: "#8b5cf6" },
  { value: "purple", label: "紫色", preview: "#a855f7" },
  { value: "fuchsia", label: "品红", preview: "#d946ef" },
  { value: "pink", label: "粉色", preview: "#ec4899" },
  { value: "rose", label: "玫瑰", preview: "#f43f5e" },
];

interface ThemeColorButtonProps {
  value: string;
  label: string;
  preview: string;
  isSelected: boolean;
  onClick: () => void;
}

function ThemeColorButton({ value, label, preview, isSelected, onClick }: ThemeColorButtonProps) {
  return (
    <button
      type="button"
      aria-label={`切换到${label}`}
      aria-pressed={isSelected}
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full border-2 border-transparent shadow-sm transition-all outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isSelected && "ring-2 ring-offset-2 ring-offset-background scale-110"
      )}
      style={{ 
        backgroundColor: preview,
        borderColor: isSelected ? "var(--foreground)" : "transparent",
      }}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
}

interface ThemeColorToggleProps {
  value: string;
  onChange: (value: string) => void;
}

export function ThemeColorToggle({ value, onChange }: ThemeColorToggleProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {themeColors.map((option) => (
        <ThemeColorButton
          key={option.value}
          value={option.value}
          label={option.label}
          preview={option.preview}
          isSelected={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}

// Light theme colors
const lightThemeColors = [
  { value: "red", preview: "#ef4444" },
  { value: "orange", preview: "#f97316" },
  { value: "amber", preview: "#f59e0b" },
  { value: "yellow", preview: "#eab308" },
  { value: "lime", preview: "#84cc16" },
  { value: "green", preview: "#22c55e" },
  { value: "emerald", preview: "#10b981" },
  { value: "teal", preview: "#14b8a6" },
  { value: "cyan", preview: "#06b6d4" },
  { value: "sky", preview: "#0ea5e9" },
  { value: "blue", preview: "#3b82f6" },
  { value: "indigo", preview: "#6366f1" },
  { value: "violet", preview: "#8b5cf6" },
  { value: "purple", preview: "#a855f7" },
  { value: "fuchsia", preview: "#d946ef" },
  { value: "pink", preview: "#ec4899" },
  { value: "rose", preview: "#f43f5e" },
];

// Dark theme colors
const darkThemeColors = [
  { value: "red", preview: "#f87171" },
  { value: "orange", preview: "#fb923c" },
  { value: "amber", preview: "#fbbf24" },
  { value: "yellow", preview: "#facc15" },
  { value: "lime", preview: "#a3e635" },
  { value: "green", preview: "#4ade80" },
  { value: "emerald", preview: "#34d399" },
  { value: "teal", preview: "#2dd4bf" },
  { value: "cyan", preview: "#22d3ee" },
  { value: "sky", preview: "#38bdf8" },
  { value: "blue", preview: "#60a5fa" },
  { value: "indigo", preview: "#818cf8" },
  { value: "violet", preview: "#a78bfa" },
  { value: "purple", preview: "#c084fc" },
  { value: "fuchsia", preview: "#e879f9" },
  { value: "pink", preview: "#f472b6" },
  { value: "rose", preview: "#fb7185" },
];

interface ColorPaletteProps {
  value: string;
  onChange: (value: string) => void;
  isDark?: boolean;
}

export function ColorPalette({ value, onChange, isDark = false }: ColorPaletteProps) {
  const colors = isDark ? darkThemeColors : lightThemeColors;
  
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {colors.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-label={option.value}
          aria-pressed={value === option.value}
          className={cn(
            "h-5 w-5 rounded-full border border-black/10 shadow-sm transition-all hover:scale-110",
            value === option.value && "ring-2 ring-offset-1 ring-offset-background ring-primary"
          )}
          style={{ backgroundColor: option.preview }}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}

export { themeColors };

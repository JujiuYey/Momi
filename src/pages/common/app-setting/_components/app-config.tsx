import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/stores/app";
import { cn } from "@/lib/utils";

// 主题颜色选项
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

function ThemeColorToggle() {
  const themeColor = useAppStore((s) => s.settings.themeColor);
  const updateSettings = useAppStore((s) => s.updateSettings);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-end gap-2">
        {themeColors.map((option) => (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`切换到${option.label}`}
                aria-pressed={themeColor === option.value}
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border border-background/80 shadow-sm transition-all outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  themeColor === option.value &&
                    "scale-105 ring-2 ring-ring ring-offset-2 ring-offset-background"
                )}
                style={{ backgroundColor: option.preview }}
                onClick={() => updateSettings({ themeColor: option.value })}
              >
                <span className="sr-only">{option.label}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>{option.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

function ThemeToggle() {
  const theme = useAppStore((s) => s.settings.theme);
  const updateSettings = useAppStore((s) => s.updateSettings);

  return (
    <Tabs
      value={theme}
      onValueChange={(value) =>
        updateSettings({ theme: value as "system" | "light" | "dark" })
      }
    >
      <TabsList>
        <TabsTrigger value="light" className="gap-2">
          <IconSun className="h-[1.2rem] w-[1.2rem]" />
          浅色
        </TabsTrigger>
        <TabsTrigger value="dark" className="gap-2">
          <IconMoon className="h-[1.2rem] w-[1.2rem]" />
          深色
        </TabsTrigger>
        <TabsTrigger value="system" className="gap-2">
          <IconDeviceDesktop className="h-[1.2rem] w-[1.2rem]" />
          系统
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function AppConfig() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">应用设置</h2>
        <p className="text-sm text-muted-foreground">个性化应用体验</p>
      </div>

      <div className="space-y-6">
        {/* 主题设置 */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">主题设置</label>
            <p className="text-sm text-muted-foreground">选择应用主题外观</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="h-px bg-border" />

        {/* 主题颜色 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">主题颜色</label>
            <p className="text-sm text-muted-foreground">
              为按钮、高亮和聚焦态选择一套主色
            </p>
          </div>
          <ThemeColorToggle />
        </div>
      </div>
    </div>
  );
}

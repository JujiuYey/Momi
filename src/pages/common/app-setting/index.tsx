import { IconSettings, IconPalette, IconDatabase, IconSparkles, IconServer, IconBrain } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AppConfig } from "./_components/app-config";
import { DataConfig } from "./_components/data-config";
import { DefaultModel } from "./_components/default-model";
import { McpService } from "./_components/mcp-service";
import { ProviderConfig } from "./_components/provider-config";

interface SettingMenu {
  title: string;
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  dividerAfter?: boolean;
}

const menus: SettingMenu[] = [
  {
    title: "模型服务",
    key: "provider-config",
    icon: IconPalette,
  },
  {
    title: "默认模型",
    key: "default-model",
    icon: IconSparkles,
    dividerAfter: true,
  },
  {
    title: "通用设置",
    key: "app-config",
    icon: IconSettings,
  },
  {
    title: "数据设置",
    key: "data",
    icon: IconDatabase,
    dividerAfter: true,
  },
  {
    title: "MCP服务",
    key: "mcp-service",
    icon: IconServer,
  },
  {
    title: "Skills",
    key: "skills",
    icon: IconBrain,
  },
];

export function AppSettingPage() {
  const [activeKey, setActiveKey] = useState("provider-config");
  const activeMenu = menus.find((menu) => menu.key === activeKey);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 侧边栏 */}
      <aside className="flex w-56 flex-col border-r bg-sidebar py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-2 text-sm font-semibold text-sidebar-foreground/70">
            设置
          </h2>
          <nav className="space-y-1">
            {menus.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              return (
                <div key={item.key}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveKey(item.key)}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.title}</span>
                  </Button>
                  {item.dividerAfter && index < menus.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="mx-auto flex max-w-7xl flex-1 flex-col overflow-hidden p-6">
        {activeKey !== "mcp-service" && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{activeMenu?.title}</h1>
            </div>
          </div>
        )}

        <ScrollArea className="min-h-0 flex-1">
          <div className="pr-3">
            {activeKey === "provider-config" && <ProviderConfig />}
            {activeKey === "default-model" && <DefaultModel />}
            {activeKey === "app-config" && <AppConfig />}
            {activeKey === "data" && <DataConfig />}
            {activeKey === "mcp-service" && <McpService />}
            {activeKey === "skills" && (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>Skills 功能开发中...</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

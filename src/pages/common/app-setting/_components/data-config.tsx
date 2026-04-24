import {
  IconDownload,
  IconUpload,
  IconFolderOpen,
  IconFile,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface DirectoryRow {
  title: string;
  hint?: string;
  value?: string;
  actionLabel: string;
  actionVariant?: "default" | "outline" | "destructive";
  actionClass?: string;
}

const backupActions = [
  { label: "备份", icon: IconDownload, variant: "outline" as const },
  { label: "恢复", icon: IconUpload, variant: "outline" as const },
];

const exportActions = [
  {
    title: "局域网传输",
    action: { label: "开始传输", icon: IconFolderOpen, variant: "outline" as const },
  },
  {
    title: "导出为文件",
    action: { label: "导出到文件", icon: IconFile, variant: "outline" as const },
  },
];

const directoryRows: DirectoryRow[] = [
  {
    title: "应用数据",
    value: "/Users/jujiuyey/Library/Application Support/Momi",
    actionLabel: "打开目录",
  },
  {
    title: "应用日志",
    value: "/Users/jujiuyey/Library/Logs/Momi",
    actionLabel: "打开日志",
  },
  {
    title: "知识库文件",
    actionLabel: "删除文件",
  },
  {
    title: "清除缓存",
    hint: "(0.91MB)",
    actionLabel: "清除缓存",
  },
  {
    title: "重置数据",
    actionLabel: "重置数据",
    actionVariant: "outline",
    actionClass: "border-destructive/60 text-destructive hover:bg-destructive/10 hover:text-destructive",
  },
];

export function DataConfig() {
  const compactBackup = false;

  return (
    <div className="space-y-5">
      {/* 数据备份与恢复 */}
      <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-sm">
        <CardHeader className="px-5 pb-2 pt-5">
          <CardTitle className="text-lg">数据设置</CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-2 pt-0">
          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-medium">数据备份与恢复</h3>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {backupActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button key={action.label} variant={action.variant} size="sm">
                    <Icon className="size-4" />
                    <span>{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-medium">精简备份</h3>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                备份时跳过备份图片、知识库等数据文件，仅备份聊天记录和设置，减少空间占用，加快备份速度
              </p>
            </div>

            <Switch checked={compactBackup} onCheckedChange={() => {}} />
          </div>
        </CardContent>
      </Card>

      {/* 导出至手机 */}
      <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-sm">
        <CardHeader className="px-5 pb-2 pt-5">
          <CardTitle className="text-lg">导出至手机</CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-2 pt-0">
          {exportActions.map((item, index) => {
            const Icon = item.action.icon;
            return (
              <div key={item.title}>
                <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-medium">{item.title}</h3>

                  <Button variant={item.action.variant} size="sm">
                    <Icon className="size-4" />
                    <span>{item.action.label}</span>
                  </Button>
                </div>

                {index < exportActions.length - 1 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* 数据目录 */}
      <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-sm">
        <CardHeader className="px-5 pb-2 pt-5">
          <CardTitle className="text-lg">数据目录</CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-2 pt-0">
          {directoryRows.map((item, index) => (
            <div key={item.title}>
              <div className="grid gap-3 py-4 sm:grid-cols-[minmax(0,180px)_1fr_auto] sm:items-center sm:gap-6">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <h3 className="text-base font-medium">{item.title}</h3>
                    {item.hint && (
                      <span className="text-sm text-muted-foreground">
                        {item.hint}
                      </span>
                    )}
                  </div>
                </div>

                {item.value ? (
                  <div className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                    <span className="truncate">{item.value}</span>
                    <IconFolderOpen className="size-3.5 shrink-0" />
                  </div>
                ) : (
                  <div className="hidden sm:block" />
                )}

                <Button
                  variant={item.actionVariant || "outline"}
                  className={cn(
                    "justify-self-start sm:justify-self-end",
                    item.actionClass
                  )}
                  size="sm"
                >
                  {item.actionLabel}
                </Button>
              </div>

              {index < directoryRows.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

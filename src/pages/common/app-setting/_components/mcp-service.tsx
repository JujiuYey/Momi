import { useState } from "react";
import {
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { McpServiceForm } from "./mcp-service/mcp-service-form";

interface McpService {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  transport_type: "stdio" | "streamable_http";
  discovery?: {
    tools: { name: string }[];
    prompts: { name: string }[];
    resources: { name: string }[];
    resource_templates: { name: string }[];
    tested_at?: string;
  };
}

type McpServiceViewState =
  | { type: "list" }
  | { type: "form"; mode: "create" | "edit"; serviceId?: string };

// Mock data for static display
const mockServices: McpService[] = [
  {
    id: "1",
    name: "文件系统服务",
    description: "提供文件系统的读写能力",
    enabled: true,
    transport_type: "stdio",
    discovery: {
      tools: [{ name: "read_file" }, { name: "write_file" }, { name: "list_directory" }],
      prompts: [],
      resources: [],
      resource_templates: [],
      tested_at: new Date().toISOString(),
    },
  },
  {
    id: "2",
    name: "网络搜索服务",
    description: "提供网络搜索能力",
    enabled: false,
    transport_type: "streamable_http",
    discovery: {
      tools: [{ name: "search" }, { name: "get_page" }],
      prompts: [{ name: "search_template" }],
      resources: [],
      resource_templates: [],
    },
  },
];

export function McpService() {
  const [viewState, setViewState] = useState<McpServiceViewState>({ type: "list" });

  if (viewState.type === "form") {
    return <McpServiceForm onBack={() => setViewState({ type: "list" })} />;
  }

  return (
    <ScrollArea className="h-full pr-3">
      <section className="space-y-5 pb-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">MCP 服务</h1>
            <Button variant="ghost" size="icon-sm">
              <IconSearch className="size-4" />
              <span className="sr-only">搜索 MCP 服务</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button size="sm" onClick={() => setViewState({ type: "form", mode: "create" })}>
              <IconPlus className="size-4" />
              <span>新增服务</span>
            </Button>
          </div>
        </div>

        {/* Service List */}
        {mockServices.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-muted/10 px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-foreground">还没有 MCP 服务</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              先添加一个服务，然后在详情页里测试连接并发现工具、提示和资源。
            </p>
            <Button
              className="mt-5"
              onClick={() => setViewState({ type: "form", mode: "create" })}
            >
              <IconPlus className="size-4" />
              新增第一个服务
            </Button>
          </div>
        ) : (
          mockServices.map((service) => (
            <article
              key={service.id}
              className="rounded-xl border border-border/70 bg-card px-5 py-5 shadow-sm transition-colors hover:border-primary/20"
            >
              <div className="flex min-h-[132px] flex-col justify-between gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-[1.2rem] font-semibold tracking-tight">
                        {service.name}
                      </h2>
                      {!service.enabled && (
                        <Badge
                          variant="outline"
                          className="border-border bg-muted text-muted-foreground"
                        >
                          已禁用
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                      {service.description ||
                        (service.discovery?.tested_at
                          ? "连接成功，已获取服务能力。"
                          : "保存后可测试连接，并发现工具、提示与资源。")}
                    </p>

                    {service.discovery?.tested_at && (
                      <p className="text-xs text-muted-foreground">
                        最近测试：{new Date(service.discovery.tested_at).toLocaleString("zh-CN")}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <Switch checked={service.enabled} />
                    <Button variant="ghost" size="icon-sm">
                      <IconTrash className="size-4" />
                      <span className="sr-only">删除服务</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        setViewState({ type: "form", mode: "edit", serviceId: service.id })
                      }
                    >
                      <IconSettings className="size-4" />
                      <span className="sr-only">查看配置</span>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-primary/20 bg-primary/10 text-primary"
                  >
                    {service.transport_type === "stdio" ? "STDIO" : "HTTP"}
                  </Badge>
                  {service.discovery?.tools && service.discovery.tools.length > 0 && (
                    <Badge variant="outline" className="border-transparent bg-primary text-primary-foreground">
                      {service.discovery.tools.length} 工具
                    </Badge>
                  )}
                  {service.discovery?.prompts && service.discovery.prompts.length > 0 && (
                    <Badge variant="outline" className="border-transparent bg-secondary text-secondary-foreground">
                      {service.discovery.prompts.length} 提示
                    </Badge>
                  )}
                  {service.discovery &&
                    service.discovery.resources.length +
                      service.discovery.resource_templates.length >
                      0 && (
                      <Badge variant="outline" className="border-transparent bg-secondary text-secondary-foreground">
                        {service.discovery.resources.length + service.discovery.resource_templates.length}{" "}
                        资源
                      </Badge>
                    )}
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </ScrollArea>
  );
}

import { useState } from "react";
import {
  IconArrowLeft,
  IconHelp,
  IconFlask,
  IconDeviceFloppy,
  IconTrash,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface McpServiceFormProps {
  onBack: () => void;
}

const transportOptions = [
  { value: "stdio", label: "标准输入 / 输出 (stdio)" },
  { value: "streamable_http", label: "Streamable HTTP" },
];

// Mock discovered tools
const mockTools = [
  {
    name: "read_file",
    title: "读取文件",
    description: "读取指定路径的文件内容",
    enabled: true,
    auto_approve: false,
  },
  {
    name: "write_file",
    title: "写入文件",
    description: "向指定路径写入内容",
    enabled: true,
    auto_approve: false,
  },
];

export function McpServiceForm({ onBack }: McpServiceFormProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    transportType: "stdio" as "stdio" | "streamable_http",
    command: "",
    args: "",
    env: "",
    url: "",
    longRunning: false,
    timeout: "60",
    enabled: true,
  });

  return (
    <ScrollArea className="h-full pr-3">
      <section className="space-y-5 pb-6">
        {/* Back button */}
        <Button variant="ghost" size="icon" onClick={onBack}>
          <IconArrowLeft className="size-4" />
          <span className="sr-only">返回 MCP 服务列表</span>
        </Button>

        {/* Form Card */}
        <article className="rounded-xl border border-border/70 bg-card px-5 py-5 shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[1.35rem] font-semibold tracking-tight">
                  {formData.name || "新增 MCP 服务"}
                </h1>
                <Badge
                  variant="outline"
                  className="border-primary/20 bg-primary/10 text-primary"
                >
                  {formData.transportType === "stdio" ? "STDIO" : "HTTP"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-border bg-muted text-muted-foreground"
                >
                  {mockTools.length} 工具
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                先保存配置，再测试连接并发现工具、提示和资源。
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 self-end sm:self-auto">
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
              <Button variant="outline" size="sm">
                <IconFlask className="size-4" />
                <span>测试连接</span>
              </Button>
              <Button variant="outline" size="sm">
                <IconTrash className="size-4" />
                <span>删除</span>
              </Button>
              <Button size="sm">
                <IconDeviceFloppy className="size-4" />
                <span>保存</span>
              </Button>
            </div>
          </div>

          <Separator className="my-5" />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">通用</TabsTrigger>
              <TabsTrigger value="tools">
                工具
                {mockTools.length > 0 && <span className="text-muted-foreground">({mockTools.length})</span>}
              </TabsTrigger>
              <TabsTrigger value="prompts">提示</TabsTrigger>
              <TabsTrigger value="resources">资源</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="mt-0 space-y-6">
              {/* Name */}
              <section className="space-y-2.5">
                <div className="flex items-center gap-1">
                  <span className="text-primary">*</span>
                  <Label>名称</Label>
                </div>
                <Input
                  placeholder="MCP 服务名称"
                  className="h-11"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </section>

              {/* Description */}
              <section className="space-y-2.5">
                <Label>描述</Label>
                <Textarea
                  placeholder="给这个服务写一段备注，方便后续识别"
                  className="min-h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </section>

              {/* Transport Type */}
              <section className="space-y-2.5">
                <div className="flex items-center gap-1">
                  <span className="text-primary">*</span>
                  <Label>类型</Label>
                </div>
                <Select
                  value={formData.transportType}
                  onValueChange={(value: "stdio" | "streamable_http") =>
                    setFormData({ ...formData, transportType: value })
                  }
                >
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transportOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>

              {/* STDIO specific fields */}
              {formData.transportType === "stdio" ? (
                <>
                  <section className="space-y-2.5">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">*</span>
                      <Label>命令</Label>
                    </div>
                    <Input
                      placeholder="例如: npx、uvx、node"
                      className="h-11"
                      value={formData.command}
                      onChange={(e) => setFormData({ ...formData, command: e.target.value })}
                    />
                  </section>

                  <section className="space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <Label>参数</Label>
                      <IconHelp className="size-4 text-muted-foreground" />
                    </div>
                    <Textarea
                      placeholder="arg1\narg2"
                      className="min-h-[96px]"
                      value={formData.args}
                      onChange={(e) => setFormData({ ...formData, args: e.target.value })}
                    />
                  </section>

                  <section className="space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <Label>环境变量</Label>
                      <IconHelp className="size-4 text-muted-foreground" />
                    </div>
                    <Textarea
                      placeholder="KEY1=value1\nKEY2=value2"
                      className="min-h-[96px]"
                      value={formData.env}
                      onChange={(e) => setFormData({ ...formData, env: e.target.value })}
                    />
                  </section>

                  <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-1.5">
                      <Label>长时间运行模式</Label>
                      <IconHelp className="size-4 text-muted-foreground" />
                    </div>
                    <Switch
                      checked={formData.longRunning}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, longRunning: checked })
                      }
                    />
                  </section>
                </>
              ) : (
                <section className="space-y-2.5">
                  <div className="flex items-center gap-1">
                    <span className="text-primary">*</span>
                    <Label>Streamable HTTP 地址</Label>
                  </div>
                  <Input
                    placeholder="例如: http://localhost:3000/mcp"
                    className="h-11"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  />
                </section>
              )}

              {/* Timeout */}
              <section className="space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <Label>超时</Label>
                  <IconHelp className="size-4 text-muted-foreground" />
                </div>
                <InputGroup>
                  <InputGroupInput
                    className="h-11"
                    value={formData.timeout}
                    onChange={(e) => setFormData({ ...formData, timeout: e.target.value })}
                  />
                  <InputGroupAddon align="inline-end" className="h-11 px-3 text-sm text-foreground/70">
                    s
                  </InputGroupAddon>
                </InputGroup>
              </section>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="mt-0">
              {mockTools.length === 0 ? (
                <div className="rounded-xl border border-dashed bg-muted/10 p-6 text-sm text-muted-foreground">
                  连接成功后，这里会显示 MCP server 暴露的工具。你可以提前在"通用"里测试连接。
                </div>
              ) : (
                <div className="space-y-3">
                  {mockTools.map((tool) => (
                    <article key={tool.name} className="rounded-xl border px-4 py-4">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground">
                              {tool.title || tool.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className="border-border bg-muted text-muted-foreground"
                            >
                              0 个参数
                            </Badge>
                          </div>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {tool.description || "这个工具没有提供额外描述。"}
                          </p>
                        </div>

                        <div className="grid shrink-0 grid-cols-2 gap-6 sm:min-w-[220px]">
                          <div className="space-y-1 text-sm">
                            <p className="font-medium text-foreground">启用工具</p>
                            <p className="text-xs text-muted-foreground">
                              后续对话阶段是否允许使用
                            </p>
                            <Switch checked={tool.enabled} />
                          </div>

                          <div className="space-y-1 text-sm">
                            <p className="font-medium text-foreground">自动批准</p>
                            <p className="text-xs text-muted-foreground">
                              后续执行时是否跳过人工确认
                            </p>
                            <Switch checked={tool.auto_approve} />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Prompts Tab */}
            <TabsContent value="prompts" className="mt-0">
              <div className="rounded-xl border border-dashed bg-muted/10 p-6 text-sm text-muted-foreground">
                这个 MCP server 目前没有暴露提示模板，或者还没有完成连接测试。
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-0 space-y-6">
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">资源</h3>
                  <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
                    0
                  </Badge>
                </div>
                <div className="rounded-xl border border-dashed bg-muted/10 p-6 text-sm text-muted-foreground">
                  暂无可列举的资源。
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">资源模板</h3>
                  <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
                    0
                  </Badge>
                </div>
                <div className="rounded-xl border border-dashed bg-muted/10 p-6 text-sm text-muted-foreground">
                  暂无资源模板。
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </article>
      </section>
    </ScrollArea>
  );
}

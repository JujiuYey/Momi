import { useState } from "react";
import {
  IconCheck,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconPlus,
  IconRotate,
  IconTrash,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

interface Provider {
  provider_id: string;
  name: string;
  icon?: string;
  website?: string;
  default_base_url: string;
}

interface ProviderModel {
  provider_id: string;
  model_id: string;
  capabilities: {
    chat: boolean;
    vision: boolean;
    tool_call: boolean;
    reasoning: boolean;
    embedding: boolean;
  };
}

interface ProviderSetting {
  provider_id: string;
  enabled: boolean;
  api_key: string;
  base_url: string;
}

interface ProviderConfigPanelProps {
  provider: Provider;
  setting: ProviderSetting | null;
  models: ProviderModel[];
}

const capabilityOptions = [
  { key: "chat" as const, label: "对话", description: "支持常规文本对话。" },
  { key: "vision" as const, label: "视觉", description: "支持图片等视觉输入。" },
  { key: "tool_call" as const, label: "工具调用", description: "支持函数或工具调用。" },
  { key: "reasoning" as const, label: "推理", description: "适合需要显式推理的模型。" },
  { key: "embedding" as const, label: "Embedding", description: "支持向量嵌入能力。" },
];

// Mock models for static display
const mockModels: ProviderModel[] = [
  {
    provider_id: "",
    model_id: "gpt-4o",
    capabilities: { chat: true, vision: true, tool_call: true, reasoning: false, embedding: false },
  },
  {
    provider_id: "",
    model_id: "gpt-4o-mini",
    capabilities: { chat: true, vision: true, tool_call: true, reasoning: false, embedding: false },
  },
];

export function ProviderConfigPanel({ provider, setting, models }: ProviderConfigPanelProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [modelDialogOpen, setModelDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(setting?.api_key ?? "");
  const [baseUrl, setBaseUrl] = useState(setting?.base_url ?? provider.default_base_url);
  const [enabled, setEnabled] = useState(setting?.enabled ?? true);
  const [modelItems] = useState<ProviderModel[]>(models.length > 0 ? models : mockModels);

  const providerInitials = provider.name.slice(0, 2).toUpperCase();
  const canRestoreBaseUrl = baseUrl !== provider.default_base_url;

  function restoreBaseUrl() {
    setBaseUrl(provider.default_base_url);
  }

  function getEnabledCapabilities(model: ProviderModel) {
    return capabilityOptions
      .filter((option) => model.capabilities[option.key])
      .map((option) => option.label);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b px-8 py-6">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xs ring-1 ring-black/5">
              {provider.icon ? (
                <img
                  src={provider.icon}
                  alt={provider.name}
                  className="h-7 w-7 object-contain"
                />
              ) : (
                <span className="text-sm font-semibold">{providerInitials}</span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-2xl font-semibold tracking-tight text-foreground">
                  {provider.name}
                </h2>
                {provider.website && (
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <IconExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <span className="text-sm font-medium text-muted-foreground">启用</span>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-8 px-8 py-6">
          {/* API 地址 */}
          <section className="space-y-3">
            <Label className="text-base font-semibold text-foreground">API 地址</Label>

            <div className="flex flex-col gap-3 md:flex-row">
              <Input
                type="text"
                placeholder="例如: https://api.openai.com/v1"
                className="h-11 rounded-xl"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl px-4 text-red-500 hover:text-red-500"
                disabled={!canRestoreBaseUrl}
                onClick={restoreBaseUrl}
              >
                <IconRotate className="h-4 w-4" />
                重置
              </Button>
            </div>
          </section>

          {/* API 密钥 */}
          <section className="space-y-3">
            <Label className="text-base font-semibold text-foreground">API 密钥</Label>

            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="请输入 API 密钥"
                className="h-11 rounded-xl pr-11"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center text-muted-foreground transition hover:text-foreground"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
              </button>
            </div>
          </section>

          {/* 模型 */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Label className="text-base font-semibold text-foreground">模型</Label>
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {modelItems.length}
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-xl"
                onClick={() => setModelDialogOpen(true)}
              >
                <IconPlus className="h-4 w-4" />
                新增模型
              </Button>
            </div>

            {modelItems.length > 0 ? (
              <div className="space-y-3">
                {modelItems.map((model, index) => (
                  <div
                    key={`${model.model_id}-${index}`}
                    className="space-y-3 rounded-2xl border bg-background px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
                            {provider.icon ? (
                              <img
                                src={provider.icon}
                                alt={provider.name}
                                className="h-5 w-5 object-contain"
                              />
                            ) : (
                              <span className="text-[10px] font-semibold text-muted-foreground">
                                {providerInitials}
                              </span>
                            )}
                          </div>

                          <span className="truncate text-[15px] font-medium text-foreground">
                            {model.model_id}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {getEnabledCapabilities(model).length > 0 ? (
                            getEnabledCapabilities(model).map((label) => (
                              <span
                                key={label}
                                className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                              >
                                {label}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">未设置能力</span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-10 rounded-xl px-3"
                        >
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed bg-muted/10 p-6 text-sm text-muted-foreground">
                还没有模型，点击"新增模型"后手动维护模型 ID 和能力。
              </div>
            )}
          </section>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t bg-background/95 px-8 py-4 backdrop-blur">
        <Button
          type="button"
          variant="destructive"
          className="h-10 rounded-xl"
          disabled={!setting}
        >
          <IconTrash className="mr-2 h-4 w-4" />
          删除配置
        </Button>

        <Button type="button" className="h-10 rounded-xl px-5">
          <IconCheck className="mr-2 h-4 w-4" />
          保存配置
        </Button>
      </div>

      {/* Model Dialog */}
      <Dialog open={modelDialogOpen} onOpenChange={setModelDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>新增模型</DialogTitle>
            <DialogDescription>维护模型 ID，并设置这个模型支持的能力。</DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">模型 ID</Label>
              <Input
                type="text"
                placeholder="例如: deepseek-chat"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">能力</Label>

              <div className="space-y-3 rounded-2xl border bg-muted/10 p-4">
                {capabilityOptions.map((capability) => (
                  <div
                    key={capability.key}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {capability.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                    <Switch />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModelDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setModelDialogOpen(false)}>保存模型</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

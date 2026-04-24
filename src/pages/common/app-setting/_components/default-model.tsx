import { IconHelp, IconAdjustments } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DefaultModelCard {
  key: string;
  title: string;
  description: string;
  showInfo?: boolean;
}

const cards: DefaultModelCard[] = [
  {
    key: "assistant",
    title: "默认模型",
    description:
      "创建新助手时使用的模型，如果助手未设置模型，则优先使用此模型",
  },
  {
    key: "quick",
    title: "快速模型",
    description: "执行话题命名、搜索关键词提炼等简单任务时使用的模型",
    showInfo: true,
  },
  {
    key: "translation",
    title: "翻译模型",
    description: "翻译服务使用的模型",
  },
  {
    key: "embedding",
    title: "Embedding 模型",
    description: "向量检索、语义召回与知识索引时使用的模型",
  },
];

// Mock model options for static display
const modelOptions = [
  { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI" },
  { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { value: "deepseek-chat", label: "DeepSeek Chat", provider: "DeepSeek" },
  { value: "mini-max", label: "MiniMax", provider: "MiniMax" },
];

export function DefaultModel() {
  return (
    <div className="space-y-5">
      {cards.map((card) => (
        <Card
          key={card.key}
          className="rounded-[26px] border bg-card px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>{card.title}</span>
            {card.showInfo && (
              <IconHelp className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          <div className="mt-4 flex max-w-[420px] items-center gap-2">
            <Select defaultValue={modelOptions[0]?.value}>
              <SelectTrigger className="h-12 flex-1 rounded-xl">
                <SelectValue>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {modelOptions[0]?.provider.slice(0, 2).toUpperCase()}
                      </span>
                    </span>
                    <span className="min-w-0 truncate text-[15px] text-foreground">
                      {modelOptions[0]?.label}
                      <span className="text-muted-foreground">
                        {" | "}
                        {modelOptions[0]?.provider}
                      </span>
                    </span>
                  </span>
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {modelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
                        <span className="text-xs font-semibold text-muted-foreground">
                          {option.provider.slice(0, 2).toUpperCase()}
                        </span>
                      </span>
                      <span className="min-w-0 truncate">
                        {option.label}
                        <span className="text-muted-foreground">
                          {" | "}
                          {option.provider}
                        </span>
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="button" variant="outline" size="icon">
              <IconAdjustments className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">{card.description}</p>
        </Card>
      ))}
    </div>
  );
}

import deepseekIcon from "@/assets/model-icon/deepseek.svg";
import minimaxIcon from "@/assets/model-icon/minimax.svg";
import ollamaIcon from "@/assets/model-icon/ollama.svg";

export interface ProviderDefinition {
  provider_id: string;
  name: string;
  icon?: string;
  website?: string;
  default_base_url: string;
}

export type ProviderId = ProviderDefinition["provider_id"];

export const providers: ProviderDefinition[] = [
  {
    provider_id: "deepseek",
    name: "DeepSeek",
    icon: deepseekIcon,
    website: "https://platform.deepseek.com",
    default_base_url: "https://api.deepseek.com",
  },
  {
    provider_id: "minimax",
    name: "MiniMax",
    icon: minimaxIcon,
    website: "https://platform.minimaxi.com",
    default_base_url: "https://api.minimaxi.com",
  },
  {
    provider_id: "ollama",
    name: "Ollama",
    icon: ollamaIcon,
    website: "",
    default_base_url: "http://localhost:11434",
  },
];

export const configuredProviderIds: ProviderId[] = ["deepseek", "minimax"];

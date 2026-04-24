import { useState } from "react";

import { ProviderList } from "./provider-config/_components/provider-list";
import { ProviderConfigPanel } from "./provider-config/_components/provider-config-panel";

interface Provider {
  provider_id: string;
  name: string;
  icon?: string;
  website?: string;
  default_base_url: string;
}

// Mock data for static display
const mockProviders: Provider[] = [
  {
    provider_id: "openai",
    name: "OpenAI",
    icon: "",
    website: "https://platform.openai.com",
    default_base_url: "https://api.openai.com/v1",
  },
  {
    provider_id: "anthropic",
    name: "Anthropic",
    icon: "",
    website: "https://anthropic.com",
    default_base_url: "https://api.anthropic.com",
  },
  {
    provider_id: "deepseek",
    name: "DeepSeek",
    icon: "",
    website: "https://platform.deepseek.com",
    default_base_url: "https://api.deepseek.com",
  },
  {
    provider_id: "minimax",
    name: "MiniMax",
    icon: "",
    website: "https://platform.minimaxi.com",
    default_base_url: "https://api.minimaxi.com",
  },
  {
    provider_id: "ollama",
    name: "Ollama",
    icon: "",
    website: "",
    default_base_url: "http://localhost:11434",
  },
];

export function ProviderConfig() {
  const [selectedProviderId, setSelectedProviderId] = useState(mockProviders[0]?.provider_id ?? "");

  const selectedProvider = mockProviders.find(
    (provider) => provider.provider_id === selectedProviderId
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border bg-card shadow-sm">
        <ProviderList
          providers={mockProviders}
          selectedProviderId={selectedProviderId}
          onSelectProvider={setSelectedProviderId}
          configuredProviderIds={["openai", "anthropic"]}
        />
        {selectedProvider && (
          <ProviderConfigPanel
            provider={selectedProvider}
            setting={null}
            models={[]}
          />
        )}
      </div>
    </div>
  );
}

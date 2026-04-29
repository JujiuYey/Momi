import { useState } from "react";

import {
  configuredProviderIds,
  providers,
  type ProviderId,
} from "@/config/providers";

import { ProviderList } from "./provider-config/_components/provider-list";
import { ProviderConfigPanel } from "./provider-config/_components/provider-config-panel";

export function ProviderConfig() {
  const [selectedProviderId, setSelectedProviderId] = useState<ProviderId>(
    providers[0]?.provider_id ?? ""
  );

  const selectedProvider = providers.find(
    (provider) => provider.provider_id === selectedProviderId
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border bg-card shadow-sm">
        <ProviderList
          providers={providers}
          selectedProviderId={selectedProviderId}
          onSelectProvider={setSelectedProviderId}
          configuredProviderIds={configuredProviderIds}
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

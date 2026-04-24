import { cn } from "@/lib/utils";

interface Provider {
  provider_id: string;
  name: string;
  icon?: string;
}

interface ProviderListProps {
  providers: Provider[];
  selectedProviderId: string;
  onSelectProvider: (id: string) => void;
  configuredProviderIds: string[];
}

export function ProviderList({
  providers,
  selectedProviderId,
  onSelectProvider,
  configuredProviderIds,
}: ProviderListProps) {
  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r bg-muted/10 p-3">
      <nav className="space-y-1.5">
        {providers.map((provider) => {
          const isConfigured = configuredProviderIds.includes(provider.provider_id);
          const isSelected = selectedProviderId === provider.provider_id;

          return (
            <button
              key={provider.provider_id}
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors",
                isSelected
                  ? "border-primary bg-primary/20 shadow-xs"
                  : "border-transparent hover:bg-primary/10"
              )}
              onClick={() => onSelectProvider(provider.provider_id)}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-black/5">
                {provider.icon ? (
                  <img
                    src={provider.icon}
                    alt={provider.name}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground">
                    {provider.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {provider.name}
                </p>
                <p
                  className={cn(
                    "truncate text-xs",
                    isConfigured ? "text-emerald-500" : "text-muted-foreground"
                  )}
                >
                  {isConfigured ? "已配置" : "未配置"}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

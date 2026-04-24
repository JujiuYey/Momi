import logo from "@/assets/logo.svg";
import { SidebarHeader } from "@/components/ui/sidebar";

export function Logo() {
  return (
    <SidebarHeader className="flex flex-row gap-2 items-center px-2 py-3 group-data-[collapsible=icon]:justify-center">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg transition-all group-data-[collapsible=icon]:size-8 size-8">
        <img src={logo} alt="logo" className="size-4" />
      </div>
      <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
        <span className="truncate font-medium">MOMI</span>
        <span className="truncate text-xs">AI漫剧流水线</span>
      </div>
    </SidebarHeader>
  );
}

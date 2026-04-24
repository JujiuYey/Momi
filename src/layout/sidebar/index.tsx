import {
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import * as React from "react";

import { Sidebar } from "@/components/ui/sidebar";

import { Logo } from "./_components/logo";
import { NavMain } from "./_components/nav-main";
import { NavSecondary } from "./_components/nav-secondary";

const data = {
  navMain: [
    {
      title: "首页",
      url: "/",
      icon: IconHome,
    },
  ],
  navSecondary: [
    {
      title: "应用设置",
      url: "/app-setting",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <Logo />

      <NavMain items={data.navMain} />

      <NavSecondary items={data.navSecondary} className="mt-auto" />
    </Sidebar>
  );
}

import { IconArrowRight, IconSettings } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100svh-2rem)] items-center justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl">项目初始化完成</CardTitle>
          <CardDescription className="text-base">
            当前已移除业务页面，保留一个干净的基础骨架，适合从这里继续搭建你的项目。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="mb-2 text-sm font-medium">保留内容</div>
              <p className="text-muted-foreground text-sm">
                基础布局、首页、应用设置，以及现有通用组件和基础状态管理。
              </p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="mb-2 text-sm font-medium">适合下一步</div>
              <p className="text-muted-foreground text-sm">
                先从菜单结构、主题、全局配置和第一个真实业务模块开始重新搭建。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/app-setting">
                <IconSettings className="mr-2 h-4 w-4" />
                打开基础设置
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">
                查看组件体系
                <IconArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

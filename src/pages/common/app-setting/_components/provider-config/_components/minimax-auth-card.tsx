import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { openProviderAuth, readClipboardText } from "@/lib/provider-auth";

interface MiniMaxAuthCardProps {
  onApiKeyImported: (value: string) => void;
}

export function MiniMaxAuthCard({ onApiKeyImported }: MiniMaxAuthCardProps) {
  const [browserError, setBrowserError] = useState("");
  const [showFollowUpSteps, setShowFollowUpSteps] = useState(false);
  const [clipboardMessage, setClipboardMessage] = useState("");

  async function handleBrowserAuth() {
    setBrowserError("");
    setClipboardMessage("");

    try {
      await openProviderAuth("minimax");
      setShowFollowUpSteps(true);
    } catch {
      setBrowserError("无法打开浏览器，请手动访问 MiniMax 控制台完成认证。");
    }
  }

  async function handleClipboardImport() {
    setBrowserError("");
    setClipboardMessage("");

    try {
      const value = await readClipboardText();
      onApiKeyImported(value);
      setClipboardMessage("已从剪贴板填入");
    } catch {
      setClipboardMessage("无法读取剪贴板，请手动粘贴 API Key。");
    }
  }

  return (
    <Card className="gap-4 border-border/70 py-5">
      <CardHeader className="gap-2 px-5">
        <CardTitle className="text-lg">浏览器认证</CardTitle>
        <CardDescription>
          打开系统浏览器前往 MiniMax 控制台完成认证，然后回到 Momi 填入 API Key。
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="rounded-xl" onClick={handleBrowserAuth}>
            前往 MiniMax 认证
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={handleClipboardImport}
          >
            从剪贴板填入
          </Button>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          可在 MiniMax Account &gt; Settings &gt; API Keys 中创建或复制 API Key。若剪贴板不可用，也可以手动粘贴。
        </p>

        {showFollowUpSteps && (
          <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
            <p className="text-sm font-medium text-foreground">完成后请继续：</p>
            <ol className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>登录 MiniMax 平台</li>
              <li>在控制台创建或复制 API Key</li>
              <li>回到 Momi，粘贴或从剪贴板填入</li>
            </ol>
          </div>
        )}

        {browserError && <p className="text-sm text-destructive">{browserError}</p>}
        {clipboardMessage && <p className="text-sm text-muted-foreground">{clipboardMessage}</p>}
      </CardContent>
    </Card>
  );
}

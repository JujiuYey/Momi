import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { openProviderAuthMock, readClipboardTextMock } = vi.hoisted(() => ({
  openProviderAuthMock: vi.fn(),
  readClipboardTextMock: vi.fn(),
}));

vi.mock("@/lib/provider-auth", () => ({
  openProviderAuth: openProviderAuthMock,
  readClipboardText: readClipboardTextMock,
}));

import { MiniMaxAuthCard } from "./minimax-auth-card";

describe("MiniMaxAuthCard", () => {
  it("calls browser auth and shows follow-up steps after success", async () => {
    openProviderAuthMock.mockResolvedValue(undefined);

    render(<MiniMaxAuthCard onApiKeyImported={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "前往 MiniMax 认证" }));

    await waitFor(() => {
      expect(openProviderAuthMock).toHaveBeenCalledWith("minimax");
    });

    expect(await screen.findByText("登录 MiniMax 平台")).toBeInTheDocument();
    expect(screen.getByText("在控制台创建或复制 API Key")).toBeInTheDocument();
    expect(screen.getByText("回到 Momi，粘贴或从剪贴板填入")).toBeInTheDocument();
  });

  it("imports api key from clipboard and shows success message", async () => {
    const onApiKeyImported = vi.fn();

    readClipboardTextMock.mockResolvedValue("minimax-api-key");

    render(<MiniMaxAuthCard onApiKeyImported={onApiKeyImported} />);

    fireEvent.click(screen.getByRole("button", { name: "从剪贴板填入" }));

    await waitFor(() => {
      expect(readClipboardTextMock).toHaveBeenCalledTimes(1);
      expect(onApiKeyImported).toHaveBeenCalledWith("minimax-api-key");
    });

    expect(await screen.findByText("已从剪贴板填入")).toBeInTheDocument();
  });

  it("shows a non-blocking error when clipboard read fails", async () => {
    readClipboardTextMock.mockRejectedValue(new Error("clipboard_unavailable"));

    render(<MiniMaxAuthCard onApiKeyImported={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "从剪贴板填入" }));

    expect(await screen.findByText("无法读取剪贴板，请手动粘贴 API Key。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "从剪贴板填入" })).toBeInTheDocument();
  });
});

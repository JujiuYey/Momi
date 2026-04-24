import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { miniMaxAuthCardMock } = vi.hoisted(() => ({
  miniMaxAuthCardMock: vi.fn(
    ({ onApiKeyImported }: { onApiKeyImported: (value: string) => void }) => (
      <button type="button" onClick={() => onApiKeyImported("imported-minimax-key")}>
        Mock MiniMax Auth Card
      </button>
    )
  ),
}));

vi.mock("./minimax-auth-card", () => ({
  MiniMaxAuthCard: miniMaxAuthCardMock,
}));

import { ProviderConfigPanel } from "./provider-config-panel";

const minimaxProvider = {
  provider_id: "minimax",
  name: "MiniMax",
  default_base_url: "https://api.minimax.chat/v1",
};

const openAIProvider = {
  provider_id: "openai",
  name: "OpenAI",
  default_base_url: "https://api.openai.com/v1",
};

const setting = {
  provider_id: "minimax",
  enabled: true,
  api_key: "",
  base_url: "https://api.minimax.chat/v1",
};

describe("ProviderConfigPanel", () => {
  beforeEach(() => {
    miniMaxAuthCardMock.mockClear();
  });

  it("renders the MiniMax auth module only for minimax providers", () => {
    const { rerender } = render(
      <ProviderConfigPanel provider={minimaxProvider} setting={setting} models={[]} />
    );

    expect(screen.getByRole("button", { name: "Mock MiniMax Auth Card" })).toBeInTheDocument();
    expect(miniMaxAuthCardMock).toHaveBeenCalledTimes(1);

    rerender(<ProviderConfigPanel provider={openAIProvider} setting={null} models={[]} />);

    expect(
      screen.queryByRole("button", { name: "Mock MiniMax Auth Card" })
    ).not.toBeInTheDocument();
    expect(miniMaxAuthCardMock).toHaveBeenCalledTimes(1);
  });

  it("resets the api key input when rerendering from minimax to another provider", () => {
    const { rerender } = render(
      <ProviderConfigPanel provider={minimaxProvider} setting={setting} models={[]} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Mock MiniMax Auth Card" }));

    expect(screen.getByPlaceholderText("请输入 API 密钥")).toHaveValue("imported-minimax-key");

    rerender(<ProviderConfigPanel provider={openAIProvider} setting={null} models={[]} />);

    expect(screen.getByPlaceholderText("请输入 API 密钥")).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: "Mock MiniMax Auth Card" })
    ).not.toBeInTheDocument();
  });

  it("keeps imported draft api keys across equivalent same-provider rerenders", () => {
    const { rerender } = render(
      <ProviderConfigPanel provider={minimaxProvider} setting={setting} models={[]} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Mock MiniMax Auth Card" }));

    expect(screen.getByPlaceholderText("请输入 API 密钥")).toHaveValue("imported-minimax-key");

    rerender(
      <ProviderConfigPanel
        provider={{ ...minimaxProvider }}
        setting={{ ...setting }}
        models={[]}
      />
    );

    expect(screen.getByPlaceholderText("请输入 API 密钥")).toHaveValue("imported-minimax-key");
    expect(screen.getByRole("button", { name: "Mock MiniMax Auth Card" })).toBeInTheDocument();
  });
});

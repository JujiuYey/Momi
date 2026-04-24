import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { invokeMock } = vi.hoisted(() => ({
  invokeMock: vi.fn(),
}));

vi.mock("@tauri-apps/api/core", () => ({
  invoke: invokeMock,
}));

import { openProviderAuth, readClipboardText } from "./provider-auth";

describe("provider auth helpers", () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    invokeMock.mockReset();
  });

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
  });

  it('openProviderAuth("minimax") calls the tauri command with provider id', async () => {
    await openProviderAuth("minimax");

    expect(invokeMock).toHaveBeenCalledWith("open_provider_auth", {
      providerId: "minimax",
    });
  });

  it("readClipboardText returns trimmed clipboard text", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        readText: vi.fn().mockResolvedValue("  minimax token  "),
      },
    });

    await expect(readClipboardText()).resolves.toBe("minimax token");
  });

  it("readClipboardText rejects empty clipboard content with clipboard_empty", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        readText: vi.fn().mockResolvedValue("   "),
      },
    });

    await expect(readClipboardText()).rejects.toThrowError("clipboard_empty");
  });

  it("readClipboardText rejects when clipboard API is missing with clipboard_unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    await expect(readClipboardText()).rejects.toThrowError("clipboard_unavailable");
  });

  it("readClipboardText rejects readText failures with clipboard_unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        readText: vi.fn().mockRejectedValue(new Error("permission denied")),
      },
    });

    await expect(readClipboardText()).rejects.toThrowError("clipboard_unavailable");
  });
});

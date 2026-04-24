import { invoke } from "@tauri-apps/api/core";

export async function openProviderAuth(providerId: string) {
  await invoke("open_provider_auth", { providerId });
}

export async function readClipboardText() {
  const readText = navigator.clipboard?.readText;

  if (!readText) {
    throw new Error("clipboard_unavailable");
  }

  let value: string;

  try {
    value = (await readText.call(navigator.clipboard)).trim();
  } catch {
    throw new Error("clipboard_unavailable");
  }

  if (!value) {
    throw new Error("clipboard_empty");
  }

  return value;
}

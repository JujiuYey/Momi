# MiniMax Browser Authentication Flow Design

Date: 2026-04-24
Status: Draft approved for planning review

## Summary

Add a provider-specific authentication flow for `MiniMax` in the app settings screen that opens the official MiniMax site in the system browser, guides the user through creating or retrieving an API key, and helps them return to the desktop app to fill the key with minimal friction.

This is intentionally not a full OAuth callback flow. Based on MiniMax's public documentation as of 2026-04-24, the supported setup model is platform login plus manual API key creation from the MiniMax console.

Official references used for this design:

- https://platform.minimax.io/docs/api-reference/api-overview
- https://platform.minimax.io/docs/faq/about-apis
- https://platform.minimax.io/docs/guides/quickstart-preparation

## Problem

The current provider settings UI expects users to understand that they must leave the app, find the MiniMax platform, log in, create an API key, copy it, then return and paste it manually. That flow is possible, but it is not obvious or guided.

Users expect a more direct "authenticate" entry point similar to other AI tools. We cannot honestly implement a true browser-to-desktop token callback flow unless MiniMax exposes an official callback-based auth flow. Instead, we should build the smoothest safe experience around the documented API-key setup path.

## Goals

- Give `MiniMax` a clear primary action that feels like an authentication flow.
- Open the official MiniMax page in the system browser from the desktop app.
- Keep the user oriented inside the app with a short "what to do next" state.
- Reduce friction when coming back by supporting clipboard-assisted key filling.
- Keep provider-specific logic minimal and easy to expand to other providers later.

## Non-Goals

- No scraping or automation of the MiniMax website.
- No browser cookie/session interception.
- No hidden account-password collection inside the app.
- No fake OAuth callback implementation.
- No generic provider-auth framework unless the implementation naturally benefits from a tiny reusable layer.

## Current Constraints

- The settings UI is currently mock-data driven.
- `src-tauri` currently has only the base Tauri app and log plugin.
- There is no existing shell-open command, deep link handler, or auth callback infrastructure.
- MiniMax public documentation currently describes manual API key management, not a desktop OAuth callback flow.

## Recommended Approach

Implement a guided browser handoff flow for the `MiniMax` provider:

1. Show a `前往 MiniMax 认证` button near the API key field when the selected provider is `MiniMax`.
2. Clicking the button calls a Tauri command that opens a whitelisted official MiniMax URL in the system browser.
3. The UI switches to a lightweight waiting/help state with three steps:
   1. Log in to MiniMax in the browser.
   2. Create or copy an API key from the official console.
   3. Return to Momi and paste or import the key.
4. Provide a `从剪贴板填入` helper button that reads clipboard text and fills the API key field.
5. Keep the ordinary API key input visible so the user can still paste manually.

This preserves user expectations around "click to authenticate" while remaining accurate about what MiniMax officially supports.

## UX Design

### Placement

Render the MiniMax auth module inside the provider detail panel, adjacent to the `API 密钥` section. It should feel like part of the credential setup flow, not like a footer link.

### MiniMax-only authentication module

Show this module only when `provider.provider_id === "minimax"`.

Suggested content:

- Title: `浏览器认证`
- Description: `将在系统浏览器中打开 MiniMax 控制台，完成登录后创建或复制 API Key，再返回此处完成配置。`
- Primary button: `前往 MiniMax 认证`
- Secondary button: `从剪贴板填入`
- Helper link text or note: `如果你已经有 API Key，也可以直接粘贴到下方输入框。`

### Waiting state after browser handoff

After the open-browser action succeeds, reveal a compact instructional card:

- Step 1: `登录 MiniMax 平台`
- Step 2: `在控制台创建或复制 API Key`
- Step 3: `回到 Momi，粘贴或从剪贴板填入`

Optional tiny success affordance:

- If clipboard import succeeds and the field is non-empty, show a short positive state like `已从剪贴板填入`.

### Failure state

If the browser-open command fails:

- Keep the API key flow usable.
- Show a short inline error, such as `无法打开浏览器，请手动访问 MiniMax 控制台完成认证。`
- Keep a clickable official URL visible as fallback.

## Technical Design

### Frontend

Primary file:

- `src/pages/common/app-setting/_components/provider-config/_components/provider-config-panel.tsx`

Responsibilities:

- Detect MiniMax provider.
- Render the authentication module.
- Manage local UI state:
  - `isOpeningAuth`
  - `hasStartedBrowserAuth`
  - `authError`
  - `clipboardImportState`
- Invoke the desktop command to open the browser.
- Read clipboard text on demand and populate the local `apiKey` state.

Implementation notes:

- Keep the existing API key input.
- The new MiniMax auth UI should layer on top of the current field, not replace it.
- Prefer a small provider-specific helper component inside the same file or one adjacent file if the panel becomes too large.

### Desktop / Tauri

Primary files:

- `src-tauri/src/lib.rs`
- optionally a new command module such as `src-tauri/src/commands/provider_auth.rs`

Responsibilities:

- Expose a Tauri command that opens a MiniMax-auth-related page in the system browser.
- Restrict allowed destinations to a short allowlist of official MiniMax domains.

Suggested command shape:

- Command name: `open_provider_auth`
- Input: `providerId: string`
- Supported values for now: only `minimax`
- Behavior for `minimax`: open the chosen official URL in the system browser

The command should not accept arbitrary URLs from the frontend. The Rust side owns the mapping from `providerId` to allowed destination.

### Browser destination

Use one official MiniMax destination owned by the app, not by user input. Depending on the cleanest public path available during implementation, this should be either:

- the MiniMax console/API key page, or
- the MiniMax platform home/login entry that leads to API key management

If a direct API-key page is used, it should still be under an official MiniMax domain and work as a safe manual-auth handoff.

## Security

- Do not collect MiniMax account credentials inside Momi.
- Do not embed webviews for login in this iteration.
- Do not accept arbitrary URLs from the renderer process.
- Keep browser-open targets hardcoded or strictly matched by provider ID.
- Treat clipboard content as untrusted text.
- Do not log API keys or clipboard contents.

## Testing Strategy

### Frontend tests

Add focused tests for the provider panel:

- Renders MiniMax auth module only for `minimax`
- Does not render the module for other providers
- Clicking `前往 MiniMax 认证` triggers the auth-open action
- Clicking `从剪贴板填入` fills the API key input when clipboard text exists
- Clipboard read failures show a small non-blocking error

### Rust verification

Keep Rust verification lightweight:

- The command compiles and is registered
- The allowlist mapping only permits MiniMax-supported destinations

### Project-level verification

- `pnpm lint:type`
- Relevant frontend test command for the provider panel
- `cargo check` for `src-tauri`

## Trade-offs Considered

### Option A: Full OAuth callback flow

Rejected for now. There is no clear official MiniMax public-doc path for a desktop callback-based auth flow, and emulating one would add fragility and security risk.

### Option B: Plain external link only

Too weak. It technically works, but it does not provide enough guidance and does not feel like a first-class provider setup flow.

### Option C: Guided browser handoff plus clipboard assist

Chosen. It gives users a clear authentication journey while staying inside the boundaries of what MiniMax publicly documents.

## Future Extension

If MiniMax later publishes an official callback-based desktop or OAuth flow, this design should evolve by:

- keeping the same entry point in the UI
- swapping the handoff implementation behind the button
- replacing the waiting card with a real callback completion state

The user-facing surface can remain stable even if the underlying auth mechanism improves later.

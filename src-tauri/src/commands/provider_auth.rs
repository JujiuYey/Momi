use tauri::AppHandle;
use tauri_plugin_opener::OpenerExt;

const MINIMAX_PROVIDER_ID: &str = "minimax";
const MINIMAX_AUTH_URL: &str = "https://platform.minimax.io/";

fn provider_auth_url(provider_id: &str) -> Result<&'static str, String> {
  match provider_id {
    MINIMAX_PROVIDER_ID => Ok(MINIMAX_AUTH_URL),
    _ => Err(format!("unsupported provider id: {provider_id}")),
  }
}

#[tauri::command]
pub fn open_provider_auth(app: AppHandle, provider_id: String) -> Result<(), String> {
  let auth_url = provider_auth_url(&provider_id)?;

  app
    .opener()
    .open_url(auth_url, None::<&str>)
    .map_err(|error| error.to_string())
}

#[cfg(test)]
mod tests {
  use super::{provider_auth_url, MINIMAX_AUTH_URL};

  #[test]
  fn returns_minimax_auth_url() {
    assert_eq!(provider_auth_url("minimax"), Ok(MINIMAX_AUTH_URL));
  }

  #[test]
  fn rejects_unsupported_provider_ids() {
    let error = provider_auth_url("openai").expect_err("provider should be rejected");
    assert_eq!(error, "unsupported provider id: openai");
  }
}

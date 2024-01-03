use tauri::Runtime;

#[tauri::command]
async fn create_project(app: tauri::AppHandle) -> Result<(), String> {
    Ok(())
}

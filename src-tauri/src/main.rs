// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use database::setup::get_database;
use tauri::Manager;

mod config;
mod database;
mod error;
mod github;
mod projects;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(get_database(app));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            projects::create_project,
            projects::read_project_list,
            projects::read_project,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

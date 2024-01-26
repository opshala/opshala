use crate::config::ProjectConfig;
use serde_derive::{Deserialize, Serialize};
use ssh_key::LineEnding;

pub mod crud;
pub mod helpers;

#[cfg(windows)]
const LINE_ENDING: LineEnding = LineEnding::CRLF;
#[cfg(not(windows))]
const LINE_ENDING: LineEnding = LineEnding::LF;

#[tauri::command]
pub async fn create_project(
    app_handle: tauri::AppHandle,
    db_conn: tauri::State<'_, crate::database::DbConnection>,
    github_repo_url: &str,
    github_token: &str,
    parent_folder_path: &str,
) -> Result<(), String> {
    let (owner, name) = helpers::get_repository_owner_and_name(github_repo_url).unwrap();
    // We create a Product struct and then save it to database
    let project = Project::new(github_repo_url, parent_folder_path).unwrap();
    project.save_to_database(&db_conn).unwrap();

    // We create a new SSH key pair for the project and add it to GitHub as a deploy key, with write access
    let ssh_private_key = PrivateKey::random(&mut OsRng, Algorithm::Ed25519).unwrap();
    ssh_private_key
        .write_openssh_file(
            app_handle
                .path_resolver()
                .app_data_dir()
                .unwrap()
                .join(format!("ssh-key-{}-{}", owner, name))
                .as_path(),
            LINE_ENDING,
        )
        .unwrap();

    save_deploy_key_to_repository(owner, name, ssh_private_key.public_key(), github_token)
        .await
        .unwrap();

    clone_github_repository(
        owner,
        name,
        parent_folder_path,
        app_handle
            .path_resolver()
            .app_data_dir()
            .unwrap()
            .join(format!("ssh-key-{}-{}", owner, name)),
    );
    Ok(())
}

#[tauri::command]
pub async fn read_project_list(
    db_conn: tauri::State<'_, crate::database::DbConnection>,
) -> Result<Vec<Project>, String> {
    let project_list = crud::read_project_list(&db_conn).unwrap();
    Ok(project_list)
}

#[tauri::command]
pub async fn read_project(
    db_conn: tauri::State<'_, crate::database::DbConnection>,
) -> Result<Project, String> {
    let project: Project = crud::read_project(&db_conn, 1 as i64).unwrap();
    Ok(project)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Project {
    id: Option<i64>,
    name: String,
    label: String,
    repository_url: String,
    local_path: String,
    project_config: Option<ProjectConfig>,
}

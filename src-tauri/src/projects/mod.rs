use ssh_key::{rand_core::OsRng, Algorithm, LineEnding, PrivateKey};

use super::github::clone_github_repository;
use crate::github::save_deploy_key_to_repository;

#[cfg(windows)]
const LINE_ENDING: LineEnding = LineEnding::CRLF;
#[cfg(not(windows))]
const LINE_ENDING: LineEnding = LineEnding::LF;

fn get_repository_owner_and_name(github_repo_url: &str) -> Result<(&str, &str), String> {
    // We extract the repository owner and name from the github URL
    // URLs can be either https://github.com/{owner}/{name} or https://github.com/{owner}/{name}.git or git@github.com:{owner}/{name}.git
    let github_repo_url = github_repo_url.trim();
    let github_repo_url = github_repo_url.trim_end_matches(".git");
    let github_repo_url = github_repo_url.trim_end_matches('/');
    let mut split = github_repo_url.split('/').rev();

    let name = split.next().unwrap();
    let owner = split.next().unwrap();
    Ok((owner, name))
}

#[tauri::command]
pub async fn create_project(
    app_handle: tauri::AppHandle,
    github_repo_url: &str,
    github_token: &str,
    parent_folder_path: &str,
) -> Result<(), String> {
    let (owner, name) = get_repository_owner_and_name(github_repo_url).unwrap();
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

#[cfg(test)]
mod tests {
    #[test]
    fn test_get_repository_owner_and_name() {
        assert_eq!(
            super::get_repository_owner_and_name("https://github.com/brainless/opshala").unwrap(),
            ("brainless", "opshala")
        );
        assert_eq!(
            super::get_repository_owner_and_name("https://github.com/brainless/opshala.git")
                .unwrap(),
            ("brainless", "opshala")
        );
        assert_eq!(
            super::get_repository_owner_and_name("git@github.com/brainless/opshala.git").unwrap(),
            ("brainless", "opshala")
        );
    }
}

use std::{collections::HashMap, path::Path};

use git2::{build::RepoBuilder, Cred, RemoteCallbacks};
use reqwest::{header, StatusCode};
use ssh_key::{rand_core::OsRng, Algorithm, LineEnding, PrivateKey};

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

fn get_repository_ssh_url(owner: &str, name: &str) -> String {
    format!("git@github.com:{}/{}.git", owner, name)
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
    let ssh_public_key = ssh_private_key.public_key().clone().to_string();

    // We save the SSH public key to GitHub using the API
    // https://docs.github.com/en/rest/deploy-keys/deploy-keys?apiVersion=2022-11-28
    let mut payload = HashMap::new();
    payload.insert("title", "opshala-desktop-app");
    payload.insert("key", ssh_public_key.as_str());
    payload.insert("read_only", "false");

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert(
        header::ACCEPT,
        "application/vnd.github+json".parse().unwrap(),
    );
    headers.insert(
        header::AUTHORIZATION,
        format!("Bearer {}", github_token).parse().unwrap(),
    );
    headers.insert("X-GitHub-Api-Version", "2022-11-28".parse().unwrap());
    headers.insert(header::USER_AGENT, "opshala-desktop-app".parse().unwrap());
    let client = reqwest::Client::new();
    let response = client
        .post("https://api.github.com/repos/brainless/opshala-test/keys")
        .json(&payload)
        .headers(headers)
        .send()
        .await
        .unwrap();

    if response.status() != StatusCode::CREATED {
        println!("{:?}", response.headers());
        return Err("Error while creating deploy key on GitHub".to_owned());
    }

    // We clone the repository using the SSH URL and the SSH private key
    // Code take from https://docs.rs/git2/latest/git2/build/struct.RepoBuilder.html#example
    let mut callbacks = RemoteCallbacks::new();
    callbacks.credentials(|_url, username_from_url, _allowed_types| {
        Cred::ssh_key(
            username_from_url.unwrap(),
            None,
            std::path::Path::new(
                app_handle
                    .path_resolver()
                    .app_data_dir()
                    .unwrap()
                    .join(format!("ssh-key-{}-{}", owner, name))
                    .as_path(),
            ),
            None,
        )
    });

    // Prepare fetch options
    let mut fetch_options = git2::FetchOptions::new();
    fetch_options.remote_callbacks(callbacks);

    // Prepare builder
    let mut builder = RepoBuilder::new();
    builder.fetch_options(fetch_options);

    // Clone the project
    builder
        .clone(
            &get_repository_ssh_url(owner, name),
            Path::new(parent_folder_path)
                .join(Path::new(name))
                .as_path(),
        )
        .unwrap();
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

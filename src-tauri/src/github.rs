use git2::{build::RepoBuilder, Cred, RemoteCallbacks};
use reqwest::{header, StatusCode};
use ssh_key::PublicKey;
use std::{
    collections::HashMap,
    path::{Path, PathBuf},
};

fn get_repository_ssh_url(owner: &str, name: &str) -> String {
    format!("git@github.com:{}/{}.git", owner, name)
}

pub fn clone_github_repository(
    repository_owner: &str,
    repository_name: &str,
    parent_folder_path: &str,
    ssh_key_path: PathBuf,
) {
    // We clone the repository using the SSH URL and the SSH private key
    // Code take from https://docs.rs/git2/latest/git2/build/struct.RepoBuilder.html#example
    let mut callbacks = RemoteCallbacks::new();
    callbacks.credentials(|_url, username_from_url, _allowed_types| {
        Cred::ssh_key(
            username_from_url.unwrap(),
            None,
            ssh_key_path.as_path(),
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
            &get_repository_ssh_url(repository_owner, repository_name),
            Path::new(parent_folder_path)
                .join(Path::new(repository_name))
                .as_path(),
        )
        .unwrap();
}

pub async fn save_deploy_key_to_repository(
    repository_owner: &str,
    repository_name: &str,
    ssh_public_key: &PublicKey,
    github_token: &str,
) -> Result<(), String> {
    let ssh_public_key = ssh_public_key.to_string();
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
        .post(format!(
            "https://api.github.com/repos/{}/{}/keys",
            repository_owner, repository_name
        ))
        .json(&payload)
        .headers(headers)
        .send()
        .await
        .unwrap();

    if response.status() != StatusCode::CREATED {
        println!("{:?}", response.headers());
        return Err("Error while creating deploy key on GitHub".to_owned());
    }
    Ok(())
}

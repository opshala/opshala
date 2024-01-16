pub fn get_repository_owner_and_name(github_repo_url: &str) -> Result<(&str, &str), String> {
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

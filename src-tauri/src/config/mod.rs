use crate::error::OpShalaError;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct ProjectConfig {
    name: String,
    version: String,
    opshala_version: String,
    apps: Vec<App>,
    domains: Vec<Domain>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct App {
    id: u32,
    name: String,
    requested_version: String,
    deployed_version: Option<String>,
    relative_path: Option<String>,
    depends_on: Option<Vec<u32>>,
    domain_id: Option<u32>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Domain {
    id: u32,
    domain: String,
}

pub fn load_config(project_path: PathBuf) -> Result<ProjectConfig, OpShalaError> {
    let mut file_path = project_path.clone();
    file_path.push("OpShala.ron");

    // Read a file as str
    let config = std::fs::read_to_string(file_path)
        .map_err(OpShalaError::from_config_file_read_error)
        .unwrap();

    // Read a RON config file and print it out
    let config = ron::from_str::<ProjectConfig>(&config)
        .map_err(OpShalaError::from_config_parse_error)
        .unwrap();

    Ok(config)
}

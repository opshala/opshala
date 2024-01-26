mod crud;

use serde_derive::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct App {
    id: Option<i64>,
    name: String,
    label: Option<String>,
    requested_version: RequestedVersion,
    deployed_version: Option<DeployedVersion>,
    relative_path: Option<PathBuf>,
    depends_on: Vec<i64>,
    domain_id: i64,
}

pub enum RequestedVersion {
    Latest {
        lts_only: bool, // Long Term Support
    },
    AutoUpdate {
        lts_only: bool, // Long Term Support
    },
    Specific(String),
}

pub enum DeployedVersion {
    Unknown, // For any unhandled system situation
    Specific(String),
}

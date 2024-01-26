use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Domain {
    id: i64,
    name: String,
    label: String,
    dns_managed_by: i64,
}

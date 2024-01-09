use std::path::PathBuf;
use url::Url;

use super::helpers::get_repository_owner_and_name;
use crate::database::DbConnection;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Project {
    name: String,
    label: String,
    repository_url: String,
    local_path: String,
}

impl Project {
    pub fn new(repository_url: &str, local_path: &str) -> Result<Self, String> {
        let (_owner, name) = get_repository_owner_and_name(repository_url).unwrap();
        let url = Url::parse(repository_url).unwrap();
        if url.host_str().unwrap() != "github.com" {
            return Err("Only GitHub repositories are supported for now".to_string());
        }
        Ok(Self {
            name: name.to_string(),
            label: name.to_string(),
            repository_url: repository_url.to_string(),
            local_path: local_path.to_string(),
        })
    }

    pub fn get_local_path_buf(&self) -> PathBuf {
        PathBuf::from(&self.local_path)
    }

    pub fn save_to_database(&self, db: &DbConnection) -> Result<(), rusqlite::Error> {
        let conn = db.connection.lock().unwrap();
        conn.execute(
            "INSERT INTO projects (name, label, repository_url, local_path) VALUES (?1, ?2, ?3, ?4)",
            (
                &self.name,
                &self.label,
                &self.repository_url,
                &self.local_path,
            ),
        )?;
        Ok(())
    }
}

pub fn read_project_list(db: &DbConnection) -> Result<Vec<Project>, rusqlite::Error> {
    let conn = db.connection.lock().unwrap();
    let mut stmt = conn.prepare("SELECT * FROM projects")?;
    let project_iter = stmt.query_map([], |row| {
        Ok(Project {
            name: row.get(1)?,
            label: row.get(2)?,
            repository_url: row.get(3)?,
            local_path: row.get(4)?,
        })
    })?;
    Ok(project_iter.map(|x| x.unwrap()).collect())
}

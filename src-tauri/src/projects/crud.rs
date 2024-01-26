use super::{helpers::get_repository_owner_and_name, Project};
use crate::{config::load_config, database::DbConnection, error::OpShalaError};
use std::path::PathBuf;
use url::Url;

impl Project {
    pub fn new(repository_url: &str, local_path: &str) -> Result<Self, String> {
        let (_owner, name) = get_repository_owner_and_name(repository_url).unwrap();
        let url = Url::parse(repository_url).unwrap();
        if url.host_str().unwrap() != "github.com" {
            return Err("Only GitHub repositories are supported for now".to_string());
        }
        Ok(Self {
            id: None,
            name: name.to_string(),
            label: name.to_string(),
            repository_url: repository_url.to_string(),
            local_path: local_path.to_string(),
            project_config: None,
        })
    }

    pub fn from_row(
        row: &rusqlite::Row,
        load_config: Option<bool>,
    ) -> Result<Self, rusqlite::Error> {
        let mut project = Self {
            id: Some(row.get(0)?),
            name: row.get(1)?,
            label: row.get(2)?,
            repository_url: row.get(3)?,
            local_path: row.get(4)?,
            project_config: None,
        };
        if let Some(true) = load_config {
            project.load_config();
        };
        Ok(project)
    }

    pub fn get_local_path_buf(&self) -> PathBuf {
        let mut path = PathBuf::from(&self.local_path);
        path.push(self.name.clone());
        path
    }

    pub fn load_config(&mut self) {
        self.project_config = Some(load_config(self.get_local_path_buf()).unwrap());
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
        ).map_err(OpShalaError::from_conn_execute_error).unwrap();
        Ok(())
    }
}

pub fn read_project_list(db: &DbConnection) -> Result<Vec<Project>, rusqlite::Error> {
    let conn = db.connection.lock().unwrap();
    let mut stmt = conn.prepare("SELECT * FROM projects")?;
    let project_iter = stmt
        .query_map([], |row| Project::from_row(row, None))
        .map_err(OpShalaError::from_query_map_error)
        .unwrap();
    Ok(project_iter.map(|x| x.unwrap()).collect())
}

pub fn read_project(db: &DbConnection, id: i64) -> Result<Project, rusqlite::Error> {
    let conn = db.connection.lock().unwrap();
    let mut stmt = conn.prepare("SELECT * FROM projects WHERE id = ?1")?;
    let project = stmt
        .query_row([id], |row| Project::from_row(row, Some(true)))
        .map_err(OpShalaError::from_query_row_error)
        .unwrap();
    Ok(project)
}

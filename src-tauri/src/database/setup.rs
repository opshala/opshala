use include_dir::{include_dir, Dir};
use lazy_static::lazy_static;
use rusqlite::Connection;
use rusqlite_migration::Migrations;
use std::sync::Mutex;
use tauri::{api::path::app_data_dir, Config};

use super::DbConnection;

static MIGRATIONS_DIR: Dir = include_dir!("$CARGO_MANIFEST_DIR/migrations");

lazy_static! {
    static ref MIGRATIONS: Migrations<'static> =
        Migrations::from_directory(&MIGRATIONS_DIR).unwrap();
}

#[cfg(dev)]
fn get_database_connection(_config: &Config) -> Connection {
    let mut connection = Connection::open("../opshala.sqlite3").unwrap();
    MIGRATIONS.to_latest(&mut connection).unwrap();
    connection
}

#[cfg(not(dev))]
fn get_database_connection(config: &Config) -> Connection {
    let mut path = app_data_dir(config).unwrap();
    path.push("opshala.sqlite3");
    let mut connection = Connection::open(path).unwrap();
    MIGRATIONS.to_latest(&mut connection).unwrap();
    connection
}

pub fn get_database(app: &tauri::App) -> DbConnection {
    DbConnection {
        connection: Mutex::new(get_database_connection(&app.config())),
    }
}

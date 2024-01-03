use std::sync::Mutex;

use rusqlite::Connection;

pub mod setup;

pub struct DbConnection {
    pub connection: Mutex<Connection>,
}

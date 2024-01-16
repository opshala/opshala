#[derive(Debug)]
pub enum OpShalaError {
    DatabaseNotFound,
    NoDataFoundInDatabase, // This is used when SQL query returns no data
    QueryExecutionError(rusqlite::Error),
    UnknownDatabaseError(rusqlite::Error),

    ConfigFileReadError(std::io::Error),
    ConfigParseError(ron::error::SpannedError),
}

impl OpShalaError {
    pub fn from_query_row_error(error: rusqlite::Error) -> Self {
        match error {
            rusqlite::Error::QueryReturnedNoRows => Self::NoDataFoundInDatabase,
            _ => Self::UnknownDatabaseError(error),
        }
    }

    pub fn from_query_map_error(error: rusqlite::Error) -> Self {
        Self::UnknownDatabaseError(error)
    }

    pub fn from_conn_execute_error(error: rusqlite::Error) -> Self {
        Self::QueryExecutionError(error)
    }

    pub fn from_config_file_read_error(error: std::io::Error) -> Self {
        Self::ConfigFileReadError(error)
    }

    pub fn from_config_parse_error(error: ron::error::SpannedError) -> Self {
        Self::ConfigParseError(error)
    }
}

use super::{App, RequestedVersion};

impl App {
    pub fn new(name: &str, requested_version: RequestedVersion) -> Result<Self, String> {
        Ok(Self {
            id: None,
            name: name.to_string(),
        })
    }
}

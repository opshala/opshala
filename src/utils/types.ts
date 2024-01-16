type TScreens =
  | "projects"
  | "create-project"
  | "manage-project"
  | "explore"
  | "infrastructure"
  | "team"
  | "profile"
  | "settings";

interface ISoftware {
  id: number;
  name: string;
  description: string;
  logo: string;
  banner?: string;
  homepageURL?: string;
  repositoryURL?: string;
  githubStars?: number;
  tags: string[];
}

interface IProjectConfig {
  name: string;
  version: string;
  opshalaVersion: string;
  software: ISoftware[];
}

interface IProject {
  id: number;
  name: string;
  label?: string;
  repositoryUrl: string;
  localPath: string;
  projectConfig?: IProjectConfig;
}

export type { TScreens, ISoftware, IProjectConfig, IProject };

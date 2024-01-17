interface IApp {
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

interface IMyApp {
  sourceApp: IApp;
}

interface IProjectConfig {
  name: string;
  version: string;
  opshalaVersion: string;
  apps: IMyApp[];
}

interface IProject {
  id: number;
  name: string;
  label?: string;
  repositoryUrl: string;
  localPath: string;
  projectConfig?: IProjectConfig;
}

export type { IApp, IMyApp, IProjectConfig, IProject };

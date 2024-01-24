interface ISourceApp {
  id: number;
  name: string;
  description: string;
  logo: string;
  homepageURL?: string;
  repositoryURL?: string;
  githubStars?: number;
  tags: string[];
}

interface IApp {
  id: number;
  name: string;
  requestedVersion: string;
  deployedVersion?: string;
  relativePath?: string;
  dependsOn?: Array<string>;
  domain?: string;
}

interface IProjectConfig {
  name: string;
  version: string;
  opshalaVersion: string;
  apps: IApp[];
}

interface IProject {
  id: number;
  name: string;
  label?: string;
  repositoryUrl: string;
  localPath: string;
  projectConfig?: IProjectConfig;
}

export type { IApp, IApp as IMyApp, IProjectConfig, IProject };

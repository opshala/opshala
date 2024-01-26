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
  dependsOn?: Array<number>;
  domainId?: number;
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

interface IDomain {
  id: number;
  domain: string;
}

interface IAppURL {
  id: number;
  domainId: number;
  appId: number;
  path: string;
}

export type { ISourceApp, IApp, IProjectConfig, IProject, IDomain, IAppURL };

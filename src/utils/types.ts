export type TScreens =
  | "projects"
  | "create-project"
  | "manage-project"
  | "explore"
  | "infrastructure"
  | "team"
  | "profile"
  | "settings";

export interface ISoftware {
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

export interface IProject {
  id: number;
  name: string;
  label?: string;
  repositoryURL: string;
  localPath: string;
  homepageURL?: string;
}

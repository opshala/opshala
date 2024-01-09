export type TScreens =
  | "projects"
  | "create-project"
  | "manage-project"
  | "explore"
  | "infrastructure"
  | "team"
  | "profile"
  | "settings";

export interface ISoftwareItem {
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

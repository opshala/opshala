export type TScreens =
  | "projects"
  | "explore"
  | "infrastructure"
  | "team"
  | "profile"
  | "settings";

export interface ISoftwareItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner?: string;
  homepageURL?: string;
  repositoryURL?: string;
  githubStars?: number;
  tags: string[];
}

import { Component, JSX, createContext, useContext } from "solid-js";
import { invoke } from "@tauri-apps/api";
import { createStore } from "solid-js/store";

import { IProject } from "../utils/types";

const PROJECT_ID = 1;

interface IProjectStore extends IProject {
  isFetching: boolean;
}

interface IStore {
  projects: { [key: number]: IProjectStore };
}

const makeStore = () => {
  const [store, setStore] = createStore<IStore>({
    projects: {},
  });

  return [
    store,
    {
      readCurrentProject: () => {
        // We invoke the Tauri API to read the project details
        invoke("read_project").then((response) => {
          setStore("projects", PROJECT_ID, {
            ...(response as IProject),
            isFetching: false,
          });
        });
      },

      getCurrentProject: () => {
        return store["projects"][PROJECT_ID];
      },
    },
  ] as const; // `as const` forces tuple type inference
};

type TStoreAndFunctions = ReturnType<typeof makeStore>;
const projectsStore = makeStore();

const ProjectsContext = createContext<TStoreAndFunctions>(projectsStore);

interface IProjectsProviderPropTypes {
  children: JSX.Element;
}

export const ProjectsProvider: Component<IProjectsProviderPropTypes> = (
  props
) => {
  return (
    <ProjectsContext.Provider value={projectsStore}>
      {props.children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);

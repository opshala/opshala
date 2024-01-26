import { Component, JSX, createContext, useContext } from "solid-js";
import { invoke } from "@tauri-apps/api";
import { createStore } from "solid-js/store";

import { IProject } from "../utils/types";

interface IStore {
  project?: IProject;
  isFetching: boolean;
}

const makeStore = () => {
  const [store, setStore] = createStore<IStore>({
    isFetching: false,
  });

  return [
    store,
    {
      readCurrentProject: () => {
        // We invoke the Tauri API to read the project details
        invoke("read_project").then((response) => {
          setStore({
            project: response as IProject,
            isFetching: false,
          });
        });
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

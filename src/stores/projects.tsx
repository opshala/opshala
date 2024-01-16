import { Component, JSX, createContext, useContext } from "solid-js";
import { invoke } from "@tauri-apps/api";
import { createStore } from "solid-js/store";

import { IProject } from "../utils/types";
import { globalStore } from "./global";

interface IProjectStore extends IProject {
  isFetching: boolean;
}

type IStore = { [key: number]: IProjectStore };

const makeStore = () => {
  const [store, setStore] = createStore<IStore>({});

  return [
    store,
    {
      readProject: (projectId: number) => {
        // We invoke the Tauri API to read the project details
        invoke("read_project", { id: projectId }).then((response) => {
          setStore(projectId, {
            ...(response as IProject),
            isFetching: false,
          });
        });
      },

      readCurrentProject: () => {
        // We read currentProjectId from global store
        const [global] = globalStore;
        if (!!global.currentProjectId) {
          // We invoke the Tauri API to read the project details
          invoke("read_project", { id: global.currentProjectId }).then(
            (response) => {
              setStore(global.currentProjectId!, {
                ...(response as IProject),
                isFetching: false,
              });
            }
          );
        }
      },

      getCurrentProject: () => {
        // We read currentProjectId from global store
        const [global] = globalStore;
        return !!global.currentProjectId
          ? store[global.currentProjectId]
          : null;
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

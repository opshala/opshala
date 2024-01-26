import { Component, JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

interface IStore {
  selectedSoftwareId?: number;
}

const makeStore = () => {
  const [store, setStore] = createStore<IStore>({});

  return [
    store,
    {
      setSelectedSoftwareId: (id: number) => {
        setStore("selectedSoftwareId", id);
      },
    },
  ] as const; // `as const` forces tuple type inference
};

type TStoreAndFunctions = ReturnType<typeof makeStore>;
export const globalStore = makeStore();

const GlobalContext = createContext<TStoreAndFunctions>(globalStore);

interface IGlobalProviderPropTypes {
  children: JSX.Element;
}

export const GlobalProvider: Component<IGlobalProviderPropTypes> = (props) => {
  return (
    <GlobalContext.Provider value={globalStore}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);

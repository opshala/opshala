import { Component, JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { TScreens } from "../utils/types";

interface IStore {
  currentScreen: TScreens;
}

const makeStore = () => {
  const [store, setStore] = createStore<IStore>({
    currentScreen: "explore",
  });

  return [
    store,
    {
      setCurrentScreen: (screen: TScreens) => {
        setStore("currentScreen", screen);
      },
    },
  ] as const; // `as const` forces tuple type inference
};

type TStoreAndFunctions = ReturnType<typeof makeStore>;
const globalStore = makeStore();

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

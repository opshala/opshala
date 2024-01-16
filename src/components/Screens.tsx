import { Component } from "solid-js";

import { useGlobal } from "../stores/global";
import { TScreens } from "../utils/types";
import Explore from "./Explore";
import Setup from "./Setup";
import Home from "./apps/Home";
import ListProjects from "./apps/List";

const Screens: Component = () => {
  const [global] = useGlobal();

  return (
    <>
      {global.currentScreen === ("setup" as TScreens) && <Setup />}
      {global.currentScreen === ("home" as TScreens) && <Home />}
      {global.currentScreen === ("explore" as TScreens) && <Explore />}
      {global.currentScreen === ("projects" as TScreens) && <ListProjects />}
    </>
  );
};

export default Screens;

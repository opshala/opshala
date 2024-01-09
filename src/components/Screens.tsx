import { Component } from "solid-js";

import { useGlobal } from "../stores/global";
import Explore from "./Explore";
import Projects from "./Projects";
import CreateProject from "./projects/CreateProject";
import { TScreens } from "../utils/types";

const Screens: Component = () => {
  const [global] = useGlobal();

  return (
    <>
      {global.currentScreen === ("explore" as TScreens) && <Explore />}
      {global.currentScreen === ("projects" as TScreens) && <Projects />}
      {global.currentScreen === ("create-project" as TScreens) && (
        <CreateProject />
      )}
    </>
  );
};

export default Screens;

import { Component } from "solid-js";

import { useGlobal } from "../stores/global";
import Explore from "./Explore";
import CreateProject from "./projects/CreateProject";
import ManageProject from "./projects/ManageProject";
import { TScreens } from "../utils/types";
import ListProjects from "./projects/List";

const Screens: Component = () => {
  const [global] = useGlobal();

  return (
    <>
      {global.currentScreen === ("explore" as TScreens) && <Explore />}
      {global.currentScreen === ("projects" as TScreens) && <ListProjects />}
      {global.currentScreen === ("create-project" as TScreens) && (
        <CreateProject />
      )}
      {global.currentScreen === ("manage-project" as TScreens) && (
        <ManageProject />
      )}
    </>
  );
};

export default Screens;

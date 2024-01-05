import { Component } from "solid-js";

import { useGlobal } from "../stores/global";
import Explore from "./Explore";
import Projects from "./Projects";
import ManageProject from "./projects/ManageProject";

const Screens: Component = () => {
  const [global] = useGlobal();

  return (
    <>
      {global.currentScreen === "explore" && <Explore />}
      {global.currentScreen === "projects" && <Projects />}
      {global.currentScreen === "manage-project" && <ManageProject />}
    </>
  );
};

export default Screens;

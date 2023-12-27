import { Component } from "solid-js";

import { useGlobal } from "../stores/global";
import Explore from "./Explore";
import Projects from "./Projects";

const Screens: Component = () => {
  const [global] = useGlobal();

  return (
    <>
      {global.currentScreen === "explore" && <Explore />}
      {global.currentScreen === "projects" && <Projects />}
    </>
  );
};

export default Screens;

import { Component } from "solid-js";

import { useGlobal } from "../stores/global";
import Explore from "./Explore";

const Screens: Component = () => {
  const [global] = useGlobal();

  return <>{global.currentScreen === "explore" && <Explore />}</>;
};

export default Screens;

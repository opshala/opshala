import { Component, createMemo } from "solid-js";
import { A, useLocation } from "@solidjs/router";

import { TScreens } from "../../utils/types";

interface INavigationButtonProps {
  label: string;
  path: string;
  onClick?: (path: TScreens) => void;
}

const NavigationButtom: Component<INavigationButtonProps> = (props) => {
  const location = useLocation();
  const currentPath = createMemo(() => location.pathname);

  const classes = createMemo(
    () =>
      `${
        currentPath() === props.path
          ? "bg-gray-900 text-white"
          : "text-gray-300"
      } hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`
  );

  return (
    <A href={props.path} class={classes()}>
      {props.label}
    </A>
  );
};

export default NavigationButtom;

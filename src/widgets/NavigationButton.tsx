import { Component, createMemo } from "solid-js";
import { TScreens } from "../utils/types";
import { useGlobal } from "../stores/global";

interface INavigationButtonProps {
  label: string;
  path: string;
  onClick?: (path: TScreens) => void;
}

const NavigationButtom: Component<INavigationButtonProps> = (props) => {
  const [store, { setCurrentScreen }] = useGlobal();

  const classes = createMemo(
    () =>
      `${
        store.currentScreen === props.path
          ? "bg-gray-900 text-white"
          : "text-gray-300"
      } hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`
  );

  const handleClick = () => {
    console.log(props.path);
    setCurrentScreen(props.path as TScreens);
  };

  return (
    <a href="#" class={classes()} onClick={handleClick}>
      {props.label}
    </a>
  );
};

export default NavigationButtom;

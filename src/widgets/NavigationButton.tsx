import { Component } from "solid-js";

interface INavigationButtonProps {
  label: string;
}

const NavigationButtom: Component<INavigationButtonProps> = (props) => {
  return (
    <a
      href="#"
      class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
      aria-current="page"
    >
      {props.label}
    </a>
  );
};

export default NavigationButtom;

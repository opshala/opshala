import { Component } from "solid-js";

interface IPropTypes {
  label: string;
}

const SidebarHeading: Component<IPropTypes> = (props) => {
  return (
    <div class="mt-4 pl-6 text-xs font-bold uppercase text-gray-500">
      {props.label}
    </div>
  );
};

export default SidebarHeading;

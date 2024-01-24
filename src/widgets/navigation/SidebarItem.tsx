import { Component } from "solid-js";

interface IPropTypes {
  label: string;
}

const SidebarItem: Component<IPropTypes> = (props) => {
  return (
    <div class="block cursor-pointer rounded-md px-6 py-1 font-semibold text-white hover:bg-gray-800">
      {props.label}
    </div>
  );
};

export default SidebarItem;

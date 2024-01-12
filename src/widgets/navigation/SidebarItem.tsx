import { Component } from "solid-js";

interface IPropTypes {
  label: string;
}

const SidebarItem: Component<IPropTypes> = (props) => {
  return (
    <div class="block font-semibold text-white cursor-pointer hover:bg-gray-800 py-1 px-3 rounded-md">
      {props.label}
    </div>
  );
};

export default SidebarItem;

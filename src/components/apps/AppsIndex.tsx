import { Component, onMount } from "solid-js";

import SidebarItem from "../../widgets/navigation/SidebarItem";
import { useProjects } from "../../stores/project";
import { RouteSectionProps } from "@solidjs/router";
import SidebarHeading from "../../widgets/navigation/SidebarHeading";

const AppsIndex: Component<RouteSectionProps> = (props) => {
  const [_, { readCurrentProject }] = useProjects();

  onMount(() => {
    readCurrentProject();
  });

  return (
    <div class="h-full w-full bg-gray-900 p-8">
      <div class="flex w-full flex-row">
        <div class="w-80 p-2 pt-8">
          <SidebarItem label="Installed apps" />
          <div class="my-4 border-b border-gray-700" />
          <SidebarHeading label="Deployments" />
          <SidebarItem label="Status" />
        </div>

        <div class="flex-grow">{props.children}</div>
      </div>
    </div>
  );
};

export default AppsIndex;

import { Component, onMount } from "solid-js";
import { RouteSectionProps } from "@solidjs/router";

import { useProjects } from "../../stores/project";
import SidebarItem from "../../widgets/navigation/SidebarItem";
import SidebarHeading from "../../widgets/navigation/SidebarHeading";

const SettingsIndex: Component<RouteSectionProps> = (props) => {
  const [_, { readCurrentProject }] = useProjects();

  onMount(() => {
    readCurrentProject();
  });

  return (
    <div class="h-full w-full bg-gray-900 p-8">
      <div class="flex w-full flex-row">
        <div class="w-80 p-2 pt-8">
          <SidebarItem label="General setup" />
          <SidebarItem label="Secrets" />

          <div class="my-4 border-b border-gray-700" />
          <SidebarHeading label="Infrastructure" />
          {/* <SidebarItem label="Integrations" /> */}
          <SidebarItem label="Hosting" />
          <SidebarItem label="Domains" />
        </div>

        <div class="flex-grow">{props.children}</div>
      </div>
    </div>
  );
};

export default SettingsIndex;

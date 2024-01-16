import { Component, onMount } from "solid-js";

import SidebarItem from "../../widgets/navigation/SidebarItem";
import General from "./manage/General";
import { useProjects } from "../../stores/projects";
import Heading from "../../widgets/typography/Heading";

const ManageProject: Component = () => {
  const [_, { readCurrentProject }] = useProjects();

  onMount(() => {
    readCurrentProject();
  });

  return (
    <div class="w-full h-full p-8 bg-gray-900">
      <Heading size="4xl">Manage Project</Heading>

      <div class="w-full flex flex-row">
        <div class="w-80 bg-gray-900 pt-8 px-8">
          <SidebarItem label="General" />

          <SidebarItem label="Software" />
          <SidebarItem label="Deployments" />

          <div class="border-b border-gray-700 my-4" />
          <div class="text-gray-500 uppercase text-xs font-bold ml-3 mb-4">
            Infrastructure
          </div>
          <SidebarItem label="Hosting" />
          <SidebarItem label="Domains" />
        </div>

        <div class="flex-grow max-w-screen-sm">
          <div class="w-full h-full p-8 bg-gray-900">
            <General />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProject;

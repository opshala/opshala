import { Component, onMount } from "solid-js";

import SidebarItem from "../../widgets/navigation/SidebarItem";

import { useProjects } from "../../stores/projects";
import Heading from "../../widgets/typography/Heading";
import Setup from "./Setup";

const Index: Component = () => {
  const [_, { readCurrentProject }] = useProjects();

  onMount(() => {
    readCurrentProject();
  });

  return (
    <div class="h-full w-full bg-gray-900 p-8">
      <Heading size="4xl">Apps</Heading>

      <div class="flex w-full flex-row">
        <div class="w-80 bg-gray-900 px-8 pt-8">
          <SidebarItem label="General Setup" />
          <SidebarItem label="Integrations" />
          <SidebarItem label="Secrets" />
        </div>

        <div class="max-w-screen-sm flex-grow">
          <div class="h-full w-full bg-gray-900 p-8">
            <Setup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

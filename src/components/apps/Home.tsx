import { Component, onMount } from "solid-js";

import SidebarItem from "../../widgets/navigation/SidebarItem";
import General from "./manage/General";
import { useProjects } from "../../stores/projects";
import Heading from "../../widgets/typography/Heading";

const Home: Component = () => {
  const [_, { readCurrentProject }] = useProjects();

  onMount(() => {
    readCurrentProject();
  });

  return (
    <div class="h-full w-full bg-gray-900 p-8">
      <Heading size="4xl">Apps</Heading>

      <div class="flex w-full flex-row">
        <div class="w-80 bg-gray-900 px-8 pt-8">
          <SidebarItem label="Software" />

          <div class="mb-4 ml-3 text-xs font-bold uppercase text-gray-500">
            Deployments
          </div>
          <SidebarItem label="Status" />

          <div class="my-4 border-b border-gray-700" />
          <div class="mb-4 ml-3 text-xs font-bold uppercase text-gray-500">
            Infrastructure
          </div>
          <SidebarItem label="Hosting" />
          <SidebarItem label="Domains" />
        </div>

        <div class="max-w-screen-sm flex-grow">
          <div class="h-full w-full bg-gray-900 p-8">
            <General />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

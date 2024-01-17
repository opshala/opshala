import { invoke } from "@tauri-apps/api";
import { Component, For, createSignal, onMount } from "solid-js";

import { IProject } from "../../utils/types";
import Heading from "../../widgets/typography/Heading";
import Paragraph from "../../widgets/typography/Paragraph";
import ProjectItem from "../../widgets/projects/Item";

const ListProjects: Component = () => {
  const [projects, setProjects] = createSignal<Array<IProject>>([]);
  onMount(() => {
    // Invoke the Tauri API to read list of projects
    invoke("read_project_list").then((response) => {
      setProjects(response as Array<IProject>);
    });
  });

  return (
    <div class="h-full w-full bg-gray-900 p-8">
      <Heading size="4xl">Apps</Heading>

      <Paragraph size="lg">
        Apps that you deploy and manage using OpShala
      </Paragraph>

      {!projects() && (
        <Paragraph size="base">
          You have not deployed any software using OpShala, please start at the
          Explore page.
        </Paragraph>
      )}

      <For each={projects()}>{(item) => <ProjectItem {...item} />}</For>
    </div>
  );
};

export default ListProjects;

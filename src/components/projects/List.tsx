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
      console.log(response);
      setProjects(response as Array<IProject>);
    });
  });

  return (
    <div class="w-full h-full p-8 bg-gray-900">
      <Heading size="4xl">Projects</Heading>

      <Paragraph size="lg">
        Software that you have deployed using OpShala
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

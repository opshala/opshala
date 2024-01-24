import { Component, For, createMemo, onMount } from "solid-js";

import { useProjects } from "../../stores/projects";
import Heading from "../../widgets/typography/Heading";
import Paragraph from "../../widgets/typography/Paragraph";
import AppItem from "../../widgets/apps/Item";

const AppsList: Component = () => {
  const [_, { readCurrentProject, getCurrentProject }] = useProjects();
  onMount(() => {
    readCurrentProject();
  });

  const apps = createMemo(() => {
    return getCurrentProject()?.projectConfig?.apps;
  });

  return (
    <>
      <Heading size="2xl">Installed apps</Heading>

      <Paragraph size="lg">
        Apps that you deploy and manage using OpShala
      </Paragraph>

      {!apps() && (
        <Paragraph size="base">
          You have not deployed any software using OpShala, please start at the
          Explore page.
        </Paragraph>
      )}

      <For each={apps()}>{(item) => <AppItem {...item} />}</For>
    </>
  );
};

export default AppsList;

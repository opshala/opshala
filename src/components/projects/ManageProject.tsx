import { Component } from "solid-js";

import { useGlobal } from "../../stores/global";
import Heading from "../../widgets/typography/Heading";
import Paragraph from "../../widgets/typography/Paragraph";
import softwareItems from "../../temp/softwareItems";
import TextInput from "../../widgets/interactable/TextInput";
import FolderInput from "../../widgets/interactable/FolderInput";
import YouTube from "../../widgets/YouTube";

const ManageProject: Component = () => {
  const [store] = useGlobal();

  const selectedSoftware = softwareItems.find(
    (x) => x.id === store.selectedSoftwareId
  );

  if (!store.currentProjectId && !selectedSoftware)
    return (
      <div class="h-full bg-gray-900">
        <div class="h-full max-w-screen-sm mx-auto p-8 ">
          <Heading size="4xl">Create a Project</Heading>

          <Paragraph size="base">
            You have not select a software to deploy, please start at the
            Explore page.
          </Paragraph>
        </div>
      </div>
    );

  return (
    <div class="h-full bg-gray-900">
      <div class="h-full max-w-screen-sm mx-auto p-8 ">
        <Heading size="4xl">
          {!!store.currentProjectId ? "Manage " : "Create a"} Project
        </Heading>

        <Paragraph size="base">
          {`You are creating a new project with ${selectedSoftware.name}`}
        </Paragraph>

        <TextInput label="Project Name" placeholder="My Business Site" />

        <FolderInput label="Save in" />

        <YouTube videoId="URmeTqglS58" />
      </div>
    </div>
  );
};

export default ManageProject;

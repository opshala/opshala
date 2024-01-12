import { Component, createSignal, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api";

import { IProject } from "../../utils/types";
import { useGlobal } from "../../stores/global";
import Heading from "../../widgets/typography/Heading";
import Paragraph from "../../widgets/typography/Paragraph";
import SidebarItem from "../../widgets/navigation/SidebarItem";
import ExternalAnchor from "../../widgets/interactable/ExternalAnchor";
import TextInput from "../../widgets/interactable/TextInput";

interface IFormData {
  githubRepoUrl: string;
  githubToken: string;
  parentFolderPath: string;
}

const ManageProject: Component = () => {
  const [global] = useGlobal();
  // We invoke the Tauri API to read the project details
  const [project, setProject] = createSignal<IProject>();
  onMount(() => {
    invoke("read_project", { id: global.currentProjectId }).then((response) => {
      setProject(response as IProject);
    });
  });
  const [formData, setFormData] = createSignal<IFormData>({
    githubRepoUrl: "",
    githubToken: "",
    parentFolderPath: "",
  });

  const handleFieldChange = (fieldName: string) => {
    const inner = (newValue: string | number) => {
      setFormData({
        ...formData(),
        [fieldName]: newValue,
      });
    };

    return inner;
  };

  return (
    <div class="w-full flex flex-row bg-gray-900">
      <div class="w-80 bg-gray-900 pt-8 px-8">
        <SidebarItem label="General" />

        <SidebarItem label="Software" />
        <SidebarItem label="Deployments" />

        <SidebarItem label="Hosting" />
        <SidebarItem label="Domains" />
      </div>

      <div class="flex-grow max-w-screen-sm">
        <div class="w-full h-full p-8 bg-gray-900">
          <Heading size="2xl">Manage Project</Heading>
          <Heading size="xl">{project()?.name}</Heading>

          <div class="mt-6" />
          <Heading size="lg">Project repository on GitHub</Heading>
          <Paragraph size="sm">
            OpShala uses GitHub to store your project and run all the automation
            needed to deploy your project to your cloud provider.
          </Paragraph>
          <ExternalAnchor href="https://github.com/new">
            Create a repo for this project
          </ExternalAnchor>
          <TextInput
            label="URL to your GitHub repository"
            value={formData().githubRepoUrl}
            onChange={handleFieldChange("githubRepoUrl")}
          />

          <div class="mt-12" />

          <Heading size="lg">Connect OpShala with GitHub</Heading>
          <Paragraph size="sm">
            OpShala needs access to the repository you just created on GitHub to
            deploy your project. In the link below, select the new repository
            and the following scopes, under Repository permissions:
          </Paragraph>
          <ol class="text-white ml-8 list-decimal text-sm">
            <li>Actions: Read and write</li>
            <li>Administration: Read and write</li>
            <li>Environments: Read and write</li>
            <li>Secrets: Read and write</li>
          </ol>
          <ExternalAnchor href="https://github.com/settings/personal-access-tokens/new">
            Create a new Personal Access Token
          </ExternalAnchor>
          <TextInput
            label="Paste your Personal Access Token"
            onChange={handleFieldChange("githubToken")}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageProject;

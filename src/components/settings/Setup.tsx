import { Component, createMemo, createSignal, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api";

import { useProjects } from "../../stores/project";
import Heading from "../../widgets/typography/Heading";
import Paragraph from "../../widgets/typography/Paragraph";
import TextInput from "../../widgets/interactable/TextInput";
import FolderInput from "../../widgets/interactable/FolderInput";
import ExternalAnchor from "../../widgets/interactable/ExternalAnchor";
import Button from "../../widgets/interactable/Button";

interface IFormData {
  githubRepoUrl: string;
  githubToken: string;
  parentFolderPath: string;
}

const Setup: Component = () => {
  const [projectStore] = useProjects();
  const [formData, setFormData] = createSignal<IFormData>({
    githubRepoUrl: "",
    githubToken: "",
    parentFolderPath: "",
  });

  onMount(() => {
    const project = projectStore.project;
    if (!!project) {
      setFormData({
        githubRepoUrl: project.repositoryUrl,
        githubToken: "Not shown",
        parentFolderPath: project.localPath,
      });
    }
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

  const handleSubmit = () => {
    // Invoke the Tauri API to create a new project
    invoke("create_project", {
      ...formData(),
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div class="max-w-screen-sm">
      <Heading size="2xl">General setup</Heading>

      <div class="mt-6" />
      <Heading size="lg">Repository on GitHub</Heading>
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
        deploy your project. In the link below, select the new repository and
        the following scopes, under Repository permissions:
      </Paragraph>
      <ol class="ml-8 list-decimal text-sm text-white">
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
        value={formData().githubToken}
        onChange={handleFieldChange("githubToken")}
      />

      <div class="mt-12" />

      <Heading size="lg">Project home folder</Heading>
      <Paragraph size="sm">
        Where would you like to save this project on your computer? This project
        will be saved in a subfolder inside the folder you select. Your user
        home folder is a good place if you are in doubt.
      </Paragraph>
      <FolderInput
        onChange={handleFieldChange("parentFolderPath")}
        value={formData().parentFolderPath}
      />

      <Button size="lg" label="Lets go!" onClick={handleSubmit} isBlock />
    </div>
  );
};

export default Setup;

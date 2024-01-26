import { Component, createMemo, createSignal } from "solid-js";

import Heading from "../../../widgets/typography/Heading";
import Paragraph from "../../../widgets/typography/Paragraph";
import ExternalAnchor from "../../../widgets/interactable/ExternalAnchor";
import TextInput from "../../../widgets/interactable/TextInput";
import { useProjects } from "../../../stores/project";

interface IFormData {
  githubRepoUrl: string;
  githubToken: string;
  parentFolderPath: string;
}

const General: Component = () => {
  const [projectStore] = useProjects();
  const [formData, setFormData] = createSignal<IFormData>({
    githubRepoUrl: projectStore.project?.repositoryUrl || "",
    githubToken: "Not shown",
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

  if (!projectStore.project) {
    return <>Loading</>;
  }

  return (
    <>
      <Heading size="2xl">{projectStore.project?.name}</Heading>

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
        value={projectStore.project?.repositoryUrl}
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
        onChange={handleFieldChange("githubToken")}
      />
    </>
  );
};

export default General;

import { Component, For } from "solid-js";

import { IApp } from "../../utils/types";
import Paragraph from "../typography/Paragraph";
import Heading from "../typography/Heading";
import ExternalAnchor from "../interactable/ExternalAnchor";
import Button from "../interactable/Button";

interface IPropTypes extends IApp {}

const SoftwareItem: Component<IPropTypes> = ({
  id,
  name,
  description,
  logo,
  homepageURL,
  repositoryURL,
  githubStars,
  tags,
}) => {
  const handleDeploy = () => {};

  return (
    <div class="my-4 rounded-lg bg-gray-800 p-4 shadow-md">
      {/* {banner && <img class="w-full mb-4" src={banner} alt={name} />} */}
      <div class="flex">
        <div class="mr-4">
          <img
            class="mb-4 h-16 w-16"
            src={
              !!logo
                ? logo
                : "https://s.w.org/style/images/about/WordPress-logotype-simplified.png"
            }
            alt={name}
          />
          <Button label="Deploy" size="sm" onClick={handleDeploy} />
        </div>
        <div class="flex-grow">
          <Heading size="xl">{name}</Heading>
          <Paragraph>{description}</Paragraph>
          {homepageURL && (
            <ExternalAnchor href={homepageURL}>Homepage</ExternalAnchor>
          )}
          {repositoryURL && (
            <ExternalAnchor href={repositoryURL}>Repository</ExternalAnchor>
          )}
          {githubStars && (
            <p class="mb-2 text-gray-300">GitHub Stars: {githubStars}</p>
          )}

          <div class="flex">
            <For each={tags}>
              {(tag) => (
                <span class="mr-2 rounded-md bg-gray-900 px-2 text-sm text-gray-300">
                  {tag}
                </span>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareItem;

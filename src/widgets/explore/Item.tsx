import { Component, For } from "solid-js";

import { ISoftware, TScreens } from "../../utils/types";
import Paragraph from "../typography/Paragraph";
import Heading from "../typography/Heading";
import ExternalAnchor from "../interactable/ExternalAnchor";
import Button from "../interactable/Button";
import { useGlobal } from "../../stores/global";

interface IPropTypes extends ISoftware {}

const SoftwareItem: Component<IPropTypes> = ({
  id,
  name,
  description,
  logo,
  banner,
  homepageURL,
  repositoryURL,
  githubStars,
  tags,
}) => {
  const [_, { setCurrentScreen, setSelectedSoftwareId }] = useGlobal();

  const handleDeploy = () => {
    setSelectedSoftwareId(id);
    setCurrentScreen("create-project" as TScreens);
  };

  return (
    <div class="bg-gray-800 rounded-lg shadow-md p-4 my-4">
      {/* {banner && <img class="w-full mb-4" src={banner} alt={name} />} */}
      <div class="flex">
        <div class="mr-4">
          <img
            class="w-16 h-16 mb-4"
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
            <p class="text-gray-300 mb-2">GitHub Stars: {githubStars}</p>
          )}

          <div class="flex">
            <For each={tags}>
              {(tag) => (
                <span class="text-gray-300 text-sm mr-2 bg-gray-900 px-2 rounded-md">
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

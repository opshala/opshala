import { Component } from "solid-js";

import { IProject, TScreens } from "../../utils/types";
import Heading from "../typography/Heading";
import ExternalAnchor from "../interactable/ExternalAnchor";
import Button from "../interactable/Button";
import { useGlobal } from "../../stores/global";

interface IPropTypes extends IProject {}

const ProjectItem: Component<IPropTypes> = (props) => {
  const [_, { setCurrentScreen, setSelectedSoftwareId }] = useGlobal();

  const handleManage = () => {
    setSelectedSoftwareId(props.id);
    setCurrentScreen("manage-project" as TScreens);
  };

  return (
    <div class="bg-gray-800 rounded-lg shadow-md p-4 my-4">
      <div class="flex">
        <div class="mr-4">
          <Button label="Manage" size="sm" onClick={handleManage} />
        </div>
        <div class="flex-grow">
          <Heading size="xl">{props.name}</Heading>
          {props.homepageURL && (
            <ExternalAnchor href={props.homepageURL}>Homepage</ExternalAnchor>
          )}
          {props.repositoryURL && (
            <ExternalAnchor href={props.repositoryURL}>
              Repository
            </ExternalAnchor>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

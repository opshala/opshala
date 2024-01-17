import { Component } from "solid-js";

import { IProject } from "../../utils/types";
import Heading from "../typography/Heading";
import ExternalAnchor from "../interactable/ExternalAnchor";
import Button from "../interactable/Button";

interface IPropTypes extends IProject {}

const MyAppItem: Component<IPropTypes> = (props) => {
  return (
    <div class="my-4 rounded-lg bg-gray-800 p-4 shadow-md">
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

export default MyAppItem;

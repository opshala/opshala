import { Component } from "solid-js";

import { IApp } from "../../utils/types";
import Heading from "../typography/Heading";
import ExternalAnchor from "../interactable/ExternalAnchor";
import Button from "../interactable/Button";

interface IPropTypes extends IApp {}

const AppItem: Component<IPropTypes> = (props) => {
  const handleManage = () => {};

  return (
    <div class="my-4 rounded-lg bg-gray-800 p-4 shadow-md">
      <div class="flex">
        <div class="mr-4">
          <Button label="Manage" size="sm" onClick={handleManage} />
        </div>
        <div class="flex-grow">
          <Heading size="xl">{props.name}</Heading>
          {props.domain && (
            <ExternalAnchor href={props.domain}>Homepage</ExternalAnchor>
          )}
          {/* {props.repositoryURL && (
            <ExternalAnchor href={props.repositoryURL}>
              Repository
            </ExternalAnchor>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AppItem;

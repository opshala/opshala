import { Component, For } from "solid-js";

import Heading from "../widgets/typography/Heading";
import Paragraph from "../widgets/typography/Paragraph";
import softwareItems from "../temp/softwareItems";
import SoftwareItem from "../widgets/explore/Item";

const Explore: Component = () => {
  return (
    <div class="h-full w-full bg-gray-900 p-8">
      <Heading size="4xl">Explore</Heading>

      <Paragraph size="lg">
        Software that can be automatically deployed and managed using OpShala
      </Paragraph>

      <For each={softwareItems}>{(item) => <SoftwareItem {...item} />}</For>
    </div>
  );
};

export default Explore;

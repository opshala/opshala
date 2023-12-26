import { Component } from "solid-js";

import Heading from "../widgets/typography/Heading";
import Paragraph from "../widgets/typography/Paragraph";

const Explore: Component = () => {
  return (
    <div class="w-full h-full p-8 bg-gray-900">
      <Heading size="4xl">Explore</Heading>

      <Paragraph size="lg">
        Explore existing software that can be automatically deployed and managed
        using OpShala
      </Paragraph>
    </div>
  );
};

export default Explore;

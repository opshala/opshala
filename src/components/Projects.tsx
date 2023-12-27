import { Component } from "solid-js";

import Heading from "../widgets/typography/Heading";
import Paragraph from "../widgets/typography/Paragraph";

const Projects: Component = () => {
  return (
    <div class="w-full h-full p-8 bg-gray-900">
      <Heading size="4xl">Projects</Heading>

      <Paragraph size="lg">
        Software that you have deployed using OpShala
      </Paragraph>

      <Paragraph size="base">
        You have not deployed any software using OpShala, please start at the
        Explore page.
      </Paragraph>
    </div>
  );
};

export default Projects;

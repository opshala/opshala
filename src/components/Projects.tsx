import { Component } from "solid-js";

import Heading from "../widgets/typography/Heading";
import Paragraph from "../widgets/typography/Paragraph";

const Projects: Component = () => {
  return (
    <div class="h-full w-full bg-gray-900 p-8">
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

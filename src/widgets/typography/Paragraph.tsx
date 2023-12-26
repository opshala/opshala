import { Component } from "solid-js";

type TParagraphProps = {
  size?: "sm" | "base" | "lg";
  children: string;
};

const Paragraph: Component<TParagraphProps> = (props) => {
  const getSizeClass = (size?: string) => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  };
  const paragraphClasses = `${getSizeClass(props.size)} text-gray-300`;

  return <p class={paragraphClasses}>{props.children}</p>;
};

export default Paragraph;

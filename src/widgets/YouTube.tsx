import { Component } from "solid-js";

interface IPropTypes {
  videoId: string;
}

const YouTube: Component<IPropTypes> = ({ videoId }) => {
  return (
    <div class="my-4">
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default YouTube;

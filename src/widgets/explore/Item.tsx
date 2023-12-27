import { Component, For } from "solid-js";

import { ISoftwareItem } from "../../utils/types";

interface IItemProps extends ISoftwareItem {}

const SoftwareItem: Component<IItemProps> = ({
  name,
  description,
  logo,
  banner,
  homepageURL,
  repositoryURL,
  githubStars,
  tags,
}) => {
  return (
    <div class="bg-gray-800 rounded-lg shadow-md p-4 my-4">
      <div class="flex">
        <img
          class="w-16 h-16 mb-4 mr-4"
          src={
            !!logo
              ? logo
              : "https://s.w.org/style/images/about/WordPress-logotype-simplified.png"
          }
          alt={name}
        />
        <div class="flex-grow">
          <h2 class="text-white text-xl font-bold mb-2">{name}</h2>
          <p class="text-gray-300 mb-4">{description}</p>
        </div>
      </div>
      {/* {banner && <img class="w-full mb-4" src={banner} alt={name} />} */}
      {homepageURL && (
        <a class="text-blue-500 hover:underline mb-2" href={homepageURL}>
          Homepage
        </a>
      )}
      {repositoryURL && (
        <a class="text-blue-500 hover:underline mb-2" href={repositoryURL}>
          Repository
        </a>
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
  );
};

export default SoftwareItem;

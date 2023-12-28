import { Component } from "solid-js";
import { open } from "@tauri-apps/api/dialog";

import Button from "./Button";

interface IPropTypes {
  label?: string;
  placeholder?: string;
  value?: string | number;
  isRequired?: boolean;
}

const FolderInput: Component<IPropTypes> = ({ label, value, isRequired }) => {
  const handleOpenRequest = async () => {
    let selectedPath = await open({
      title: "Please select a folder",
      multiple: false,
      directory: true,
    });

    if (selectedPath) {
      if (typeof selectedPath === "object") {
        selectedPath = selectedPath[0] as string;
      }
    }
  };

  return (
    <>
      {!!label && (
        <label class="block text-sm font-medium leading-6 text-gray-100">
          {label}
        </label>
      )}
      <div class="mt-2">
        <input
          type="text"
          required={isRequired}
          class="inline-block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value || ""}
        />

        <Button label="Select a Folder" onClick={handleOpenRequest} />
      </div>
    </>
  );
};

export default FolderInput;

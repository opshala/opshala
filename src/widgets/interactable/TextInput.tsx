import { Component } from "solid-js";

interface IPropTypes {
  type?: "text" | "email" | "password";
  label?: string;
  placeholder?: string;
  value?: string | number;
  isRequired?: boolean;
  onChange?: (newValue: string | number) => void;
}

const TextInput: Component<IPropTypes> = (props) => {
  return (
    <>
      {!!props.label && (
        <label class="block text-sm font-medium leading-6 text-gray-100">
          {props.label}
        </label>
      )}
      <div class="mt-2">
        <input
          type={props.type || "text"}
          required={props.isRequired}
          class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 placeholder:text-gray-400 outline-none focus:bg-yellow-100 hover:bg-yellow-100"
          placeholder={props.placeholder}
          value={props.value || ""}
          onChange={(e) => props.onChange?.(e.currentTarget.value)}
        />
      </div>
    </>
  );
};

export default TextInput;

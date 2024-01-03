import { Component } from "solid-js";

interface IPropTypes {
  type?: "text" | "email" | "password";
  label?: string;
  placeholder?: string;
  value?: string | number;
  isRequired?: boolean;
  onChange?: (newValue: string | number) => void;
}

const TextInput: Component<IPropTypes> = ({
  type,
  label,
  placeholder,
  value,
  isRequired,
  onChange,
}) => {
  return (
    <>
      {!!label && (
        <label class="block text-sm font-medium leading-6 text-gray-100">
          {label}
        </label>
      )}
      <div class="mt-2">
        <input
          type={type || "text"}
          required={isRequired}
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange?.(e.currentTarget.value)}
        />
      </div>
    </>
  );
};

export default TextInput;

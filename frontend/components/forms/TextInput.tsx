import React from "react";
import type { ChangeEventHandler } from "react";

interface TextInput {
  name: string;
  placeholder?: string;
  onChange: ChangeEventHandler;
}

const TextInput = ({ name, placeholder, onChange }: TextInput) => {
  return (
    <>
      <label htmlFor={name.replaceAll(" ", "_").toLowerCase()} className="text-gray-700 text-xs sm:text-md mt-4">
        {name}
      </label>
      <input type="text" onChange={onChange} placeholder={placeholder || ""} name={name.replaceAll(" ", "_").toLowerCase()} className="textarea textarea-bordered" />
    </>
  );
};

export default TextInput;

import React from "react";
import type { ChangeEventHandler } from "react";

interface TextAreaInput {
  name: string;
  placeholder?: string;
  onChange: ChangeEventHandler;
  value?: string;
}

const TextAreaInput = ({ value, name, placeholder, onChange }: TextAreaInput) => {
  return (
    <>
      <label htmlFor={name.replaceAll(" ", "_").toLowerCase()} className="text-gray-700 text-xs sm:text-md mt-4">
        {name}
      </label>
      <textarea value={value} rows={5} onChange={onChange} placeholder={placeholder || ""} name={name.replaceAll(" ", "_").toLowerCase()} className="textarea textarea-bordered" />
    </>
  );
};

export default TextAreaInput;

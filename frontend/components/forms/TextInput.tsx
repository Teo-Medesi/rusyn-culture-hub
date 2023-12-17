import React from "react";
import type { ChangeEventHandler } from "react";

interface TextInput {
  name: string;
  placeholder?: string;
  onChange: ChangeEventHandler;
  type?:
  | "text"
  | "email"
  | "password"
  | "date"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "color";
  className?: string;
}


const TextInput = ({ name, placeholder, onChange, type, className }: TextInput) => {
  return (
    <div className={`${className || ""} flex flex-col gap-2`}>
      <label htmlFor={name?.replaceAll(" ", "_").toLowerCase()} className="text-gray-700 text-xs sm:text-md mt-4">
        {name}
      </label>
      <input type={type} onChange={onChange} placeholder={placeholder || ""} name={name?.replaceAll(" ", "_").toLowerCase()} className="textarea textarea-bordered" />
    </div>
  );
};

export default TextInput;

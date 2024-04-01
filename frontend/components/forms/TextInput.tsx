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
  labelClassName?: string;
  value?: string;
}


const TextInput = ({ value, name, placeholder, onChange, type, className, labelClassName }: TextInput) => {
  return (
    <div className={`flex flex-col gap-2`}>
      <label htmlFor={name?.replaceAll(" ", "_").toLowerCase()} className={`text-gray-700 text-xs sm:text-md mt-4 ${labelClassName}`}>
        {name}
      </label>
      <input value={value} type={type} onChange={onChange} placeholder={placeholder || ""} name={name?.replaceAll(" ", "_").toLowerCase()} className={`textarea textarea-bordered ${className || ""}`}  />
    </div>
  );
};

export default TextInput;

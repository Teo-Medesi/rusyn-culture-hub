import React from "react";
import type { ChangeEventHandler } from "react";

export interface Option {
  value: string;
  displayText: string;
}

interface SelectInput {
  name: string;
  placeholder?: string;
  options: Option[];
  onChange: ChangeEventHandler;
  defaultValue?: string;
  value?: string;
}

const SelectInput = ({
  value,
  name,
  placeholder,
  options,
  onChange,
  defaultValue,
}: SelectInput) => {
  return (
    <div>
      <label
        htmlFor={name.replaceAll(" ", "_").toLowerCase()}
        className="text-gray-700 mt-1 sm:mt-4 text-xs sm:text-md">
        {name}
      </label>
      <select
        defaultValue={defaultValue || ""}
        onChange={onChange}
        value={value}
        name={name.replaceAll(" ", "_").toLowerCase()}
        className="select select-bordered w-full ">
        <option disabled selected>
          {placeholder || ""}
        </option>
        {options.map((option) => (
          <option value={option.value}>{option.displayText}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

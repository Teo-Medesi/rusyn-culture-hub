"use client";
import React from "react";
import { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { MouseEventHandler } from "react";
import { IoMdClose } from "react-icons/io"; 

interface TagsInput {
  placeholder?: string;
  name: string;
  tags: string[];
  onNewTag: (tag: string) => void;
  onTagDelete: (tag: string) => void;
}

const Tag = ({ text, onDelete }: { text: string, onDelete: MouseEventHandler }) => {
    return (
        <div onClick={onDelete} className="badge badge-primary badge-outline p-4 flex items-center justify-center gap-2 cursor-pointer">
            <p>{text}</p>
            <IoMdClose />
        </div>
    )
}

const TagsInput = ({ placeholder, name, tags, onNewTag, onTagDelete }: TagsInput) => {
  const [newTag, setNewTag] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  // instead of handling state logic in the TagsInput component, we will delegate to the parent element file using our own event handlers like OnNewTag() and onTagDelete()
  const onKeyDown = (event: KeyboardEvent) => {
    if (newTag && event.key === "Enter") {
      onNewTag(newTag);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <label htmlFor="tags" className="text-gray-700 text-xs sm:text-md mt-4">
        {name}
      </label>
      <input onKeyDown={onKeyDown} ref={inputRef} type="text" onChange={(event) => setNewTag(event.target?.value)} placeholder={placeholder || "Enter Tag Here"} name="tags" className="textarea outline-none textarea-bordered" />
      <div className="mt-4 flex gap-4 flex-wrap">
        {
          tags?.map((tag, index) => <Tag key={index} text={tag} onDelete={() => onTagDelete(tag)} />)
        }
      </div>
    </>
  );
};

export default TagsInput;

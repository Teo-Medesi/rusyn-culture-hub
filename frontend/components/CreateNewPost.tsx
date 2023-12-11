"use client";
import { useState } from "react";
import { SelectInput, TextInput, Option, TextAreaInput, FileInput } from "./forms";

const CreateNewPost = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [songTitle, setSongTitle] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");

  const regionOptions: Option[] = [
    { value: 'panonia', displayText: 'Panonia (Croatia & Serbia)' },
    { value: 'ukraine', displayText: 'Ukraine' },
    { value: 'slovakia', displayText: 'Slovakia' },
    { value: 'poland', displayText: 'Poland' },
    { value: 'romania', displayText: 'Romania' },
    { value: 'hungary', displayText: 'Hungary' },
    { value: 'other', displayText: 'Other' },
  ];

  return (
    <div className="max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg shadow-shadowLight rounded-xl mt-16 px-6">
      <div className="mt-3  sm:mt-5">
        <h1 className="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
          Create New Post
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          If possible, write the song's title and lyrics in Cyrillic, but the
          Latin script can also be used.
        </p>
      </div>
      <div className="mt-1 sm:mt-4">
        <form className="flex-col flex w-full">
          <TextInput name="Song Title" placeholder="" onChange={(event) => setSongTitle((event.target as HTMLInputElement).value)} />
          <SelectInput options={regionOptions} name={"Region / Country"} placeholder="Where is this song played?" onChange={(event) => setRegion((event.target as HTMLInputElement).value)} />
          <TextAreaInput name="Lyrics" onChange={(event) => setLyrics((event.target as HTMLInputElement).value)} placeholder="Ей, Нє видно тот мой валал..." />
          <TextInput name="External Links" placeholder="" onChange={() => { }} />
          <FileInput name="Sheet Music" onChange={() => { }} />
        </form>
      </div>
      <div className="pb-4 justify-center flex-col items-end mt-2 sm:mt-8 flex">
        <div className="flex gap-2 justify-center">
          <button className="btn btn-primary">
            Post
          </button>
          <button className=" btn btn-accent btn-outline">
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;

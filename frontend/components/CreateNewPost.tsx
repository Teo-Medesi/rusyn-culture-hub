"use client";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase.config";
import { Post } from "@/types";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  SelectInput,
  TextInput,
  Option,
  TextAreaInput,
  FileInput,
  TagsInput,
} from "./forms";
import FilesInput from "./forms/FilesInput";

const CreateNewPost = () => {
  const { user, isLoading } = useUser();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isFileError, setIsFileError] = useState<boolean>(false);
  const [newPostId, setNewPostId] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [songTitle, setSongTitle] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const regionOptions: Option[] = [
    { value: "panonia", displayText: "Panonia (Croatia & Serbia)" },
    { value: "ukraine", displayText: "Ukraine" },
    { value: "slovakia", displayText: "Slovakia" },
    { value: "poland", displayText: "Poland" },
    { value: "romania", displayText: "Romania" },
    { value: "hungary", displayText: "Hungary" },
    { value: "universal", displayText: "Universal" },
    { value: "other", displayText: "Other" },
  ];

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        // No image files uploaded
        setIsFileError(true);
    } else {
        // At least one image file uploaded
        setIsFileError(false);
        console.log('Image files uploaded:', imageFiles);
        setFiles(imageFiles);
    }
  }

  const handlePost = async () => {
    try {
      // perhaps an unneccesarry safeguard?
      if (user && !isLoading) {
        // TO-DO Validate or preprocess data if needed
        const post: Post = {
          songTitle,
          region,
          lyrics,
          links,
          tags,
          userId: user.uid, 
        };

        // TO-DO USE FIREBASE STORAGE TO UPLOAD IMAGE FILES

        if (process.env.NEXT_PUBLIC_DEBUG) console.log(post);

        const collectionRef = collection(db, "posts");
        const result = await addDoc(collectionRef, post);

        if (result) {
          // UI thing, show success alert
          setIsSuccess(true);
          setNewPostId(result.id);
        }
      }
    } catch (error: any) {
      console.error("Error creating new post:", error);
      setError(error);
    }
  };

  return (
    <>
      <div className="max-w-md xl:overflow-y-hidden mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full max-h-screen md:shadow-lg md:shadow-shadowLight rounded-xl px-5">
        <div className="mt-3  sm:mt-5">
          <h1 className="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
            Create New Song Post
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            If possible, write the song's title and lyrics in Cyrillic, but the
            Latin script can also be used.
          </p>
        </div>
        <div className="mt-1 sm:mt-4">
          <form className="flex-col flex w-full">
            <TextInput
              name="Song Title"
              placeholder=""
              onChange={(event) =>
                setSongTitle((event.target as HTMLInputElement).value)
              }
            />
            <SelectInput
              options={regionOptions}
              name={"Region / Country"}
              placeholder="Where is this song played?"
              onChange={(event) =>
                setRegion((event.target as HTMLInputElement).value)
              }
            />
            <TextAreaInput
              name="Lyrics"
              onChange={(event) =>
                setLyrics((event.target as HTMLInputElement).value)
              }
              placeholder="Ей, Нє видно тот мой валал..."
            />
            <TagsInput
              placeholder="Enter Link Here"
              name="External Links"
              tags={links}
              onNewTag={(link) => setLinks((current) => [...current, link])}
              onTagDelete={(link) =>
                setLinks(links.filter((element) => element != link))
              }
            />
            <FilesInput
              name="Sheet Music"
              onFilesChange={handleFiles}
            />
            <p className={`text-gray-500 text-sm ${isFileError && "!text-error italic"}`}>The only file format supported for sheet music are images! Files not supported will not be included in upload.</p>
            <TagsInput
              name="tags"
              tags={tags}
              onNewTag={(tag) => setTags((current) => [...current, tag])}
              onTagDelete={(tag) =>
                setTags(tags.filter((element) => element != tag))
              }
            />
          </form>
        </div>
        <div className="pb-4 justify-center flex-col items-end mt-8 flex">
          <div className="flex w-full flex-col md:flex-row gap-4 justify-end">
            <button className="w-full md:w-auto btn btn-outline !text-sm md:text-base md:rounded-md btn-primary !uppercase btn-outline">Save Draft</button>
            <button onClick={handlePost} className="w-full md:w-auto btn !text-sm md:text-base md:rounded-md !uppercase btn-primary">
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        role="alert"
        className={`alert flex justify-between fixed left-0 bottom-0 alert-success rounded-none transition duration-500 ease-in-out ${
          isSuccess ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <div className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Post successfully created!</span>
        </div>
        <Link href={`/app/posts/${newPostId}`} className="btn">
          GO TO POST
        </Link>
      </div>
      <div
        role="alert"
        className={`alert alert-error flex justify-between fixed left-0 bottom-0 rounded-none transition duration-500 ease-in-out ${
          error ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <div className="flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>
            Couldn't create post! <span className="ml-4 italic">{error}</span>
          </p>
        </div>
        <Link href="/app" className="btn">
          GO TO HOME
        </Link>
      </div>
    </>
  );
};

export default CreateNewPost;

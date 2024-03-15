"use client";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase.config";
import { Post } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SelectInput,
  TextInput,
  Option,
  TextAreaInput,
  FileInput,
  TagsInput,
} from "./forms";
import FilesInput from "./forms/FilesInput";
import Loading from "./Loading";

const EditPost = ({ postId }: { postId: string }) => {
  const { user, isLoading } = useUser();
  const [isPostLoading, setIsPostLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

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

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const docRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(docRef);

      const post = postSnapshot.data() as Post;

      if (post) {
        console.log(post);
        setSongTitle(post.songTitle);
        setRegion(post.region);
        setLyrics(post.lyrics);

        post.links && setLinks(post.links)
        post.files && setFiles(post.files);
        post.tags && setTags(post.tags)

        setIsPostLoading(false);
      }
    }
    catch (error) {
      if (process.env.NEXT_PUBLIC_DEBUG) console.error("Error occured!", error);
    }
  }

  const handlePost = async () => {
    try {
      // perhaps an unneccesarry safeguard?
      if (user && !isLoading) {
        // TO-DO Validate or preprocess data if needed
        const docRef = doc(db, "posts", postId);

        await updateDoc(docRef, {
          songTitle,
          region,
          lyrics,
          links,
          files,
          tags
        });

        // UI thing, show success alert
        setIsSuccess(true);

      }
    } catch (error: any) {
      console.error("Error editing new post:", error);
      setError(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      // perhaps an unneccesarry safeguard?
      if (user && !isLoading) {


        const docRef = doc(db, "posts", postId);

        await deleteDoc(docRef);

        // UI thing, show success alert
        setIsDeleted(true);

      }
    } catch (error: any) {
      console.error("Error editing new post:", error);
      setError(error);
    }
  }

  if (isPostLoading && isLoading) return <Loading />
  else return (
    <>
      <div className="max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg shadow-shadowLight rounded-xl mt-16 px-6">
        <div className="mt-3  sm:mt-5">
          <h1 className="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
            Edit Post
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
              value={songTitle}
            />
            <SelectInput
              options={regionOptions}
              name={"Region / Country"}
              placeholder="Where is this song played?"
              onChange={(event) =>
                setRegion((event.target as HTMLInputElement).value)
              }
              value={region}
            />
            <TextAreaInput
              name="Lyrics"
              onChange={(event) =>
                setLyrics((event.target as HTMLInputElement).value)
              }
              placeholder="Ей, Нє видно тот мой валал..."
              value={lyrics}
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
              onFilesChange={(files) => setFiles(files)}
            />
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
        <div className="pb-4 justify-center flex-col items-end mt-2 sm:mt-8 flex">
          <div className="flex w-full justify-between">
            <button onClick={handleDeletePost} className="btn btn-outline btn-error">
              Delete
            </button>
            <button onClick={handlePost} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
      <div
        role="alert"
        className={`alert flex justify-between fixed left-0 bottom-0 alert-success rounded-none transition duration-500 ease-in-out ${isSuccess ? "opacity-100" : "opacity-0 pointer-events-none"
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
          <span>Post successfully updated!</span>
        </div>
        <Link href={`/app/posts/${postId}`} className="btn">
          GO TO POST
        </Link>
      </div>
      <div
        role="alert"
        className={`alert alert-error flex justify-between fixed left-0 bottom-0 rounded-none transition duration-500 ease-in-out ${error ? "opacity-100" : "opacity-0 pointer-events-none"
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
            Couldn't update post! <span className="ml-4 italic">{error}</span>
          </p>
        </div>
        <Link href="/app" className="btn">
          GO TO HOME
        </Link>
      </div>
      <div
        role="alert"
        className={`alert alert-warning flex justify-between fixed left-0 bottom-0 rounded-none transition duration-500 ease-in-out ${isDeleted ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
        <div className="flex gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p>
            Post successfully deleted!
          </p>
        </div>
        <Link href="/app" className="btn">
          GO TO HOME
        </Link>
      </div>
    </>
  );
};

export default EditPost;

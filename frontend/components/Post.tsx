"use client";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase.config";
import type { Post } from "@/types";
import { cyrillicToLatin, isCyrillic as isCyrillicScript, latinToCyrillic } from "@/utils";
import { User } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Tag from "./Tag";

// TO-DO, add a notion like IFrame preview for each link and also preview user

export default function Post({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // convert from cyrillic to latin or vice-versa
  const [isSwitchToggled, setIsSwitchToggled] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const docRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(docRef);

      const post = postSnapshot.data() as Post;

      if (post) {
        setPost(post);
        setIsLoading(false);
      }
    }
    catch (error) {
      if (process.env.NEXT_PUBLIC_DEBUG) console.error("Error occured!", error);
    }
  }

  if (isLoading) {
    return <Loading />
  }
  else if (post) {
    return (
      <>
        <div className="flex px-5 md:px-8 flex-col w-full h-max lg:flex-row">
          <div className="md:p-8 lg:basis-1/3">
          </div>
          <div className="flex min-h-screen lg:basis-1/3 flex-col items-center">
            <div className="flex flex-col items-center min-h-[110vh]">
              <div onClick={() => setIsSwitchToggled(prevState => !prevState)} className={`btn lg:hidden my-8 btn-alternative ${isSwitchToggled && "btn-primary"}`}>SWITCH TO {!isSwitchToggled ? "LATIN" : "CYRILLIC"} SCRIPT</div>
              <h1 className="text-4xl mb-8 text-center lg:text-5xl">{isSwitchToggled ? cyrillicToLatin(post.songTitle) : post.songTitle}</h1>
              <p className="text-lg mb-24 lg:text-xl whitespace-pre ">{isSwitchToggled ? cyrillicToLatin(post.lyrics) : post.lyrics}</p>
            </div>
            <div className="">
              <div className="flex justify-start mb-4 w-full gap-2">
                {
                  post.tags?.map((tag, index) => <Tag key={index} text={tag} />)
                }
                <Tag text={post.region} />
              </div>

              {post?.links && <h1 className="text-3xl mb-8 text-center lg:text-5xl">External Links</h1>}
              <div className="pb-24">{post?.links?.map(link => <p className="cursor-pointer">{link}</p>)}</div>
            </div>
          </div>
          <div className="p-4 lg:basis-1/3 flex justify-end">
            <div onClick={() => setIsSwitchToggled(prevState => !prevState)} className={`btn hidden lg:inline-flex btn-alternative ${isSwitchToggled && "btn-primary"}`}>SWITCH TO {!isSwitchToggled ? "LATIN" : "CYRILLIC"} SCRIPT</div>
          </div>
        </div>
        <div
          role="alert"
          className={`alert items-center flex justify-between fixed left-0 bottom-0 rounded-none transition duration-500 ease-in-out ${user?.uid === post.userId ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
          <div className="flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-sm md:text-base">You are the owner of this post!</span>
          </div>
          <Link href={`/app/posts/${postId}/edit`} className="btn btn-primary btn-alternative">
            EDIT POST
          </Link>
        </div>

      </>
    )
  }
  else {
    return <NotFound />
  }
}


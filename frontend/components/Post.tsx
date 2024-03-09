"use client";
import { db } from "@/firebase.config";
import type { Post } from "@/types";
import { User } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Tag from "./Tag";

// TO-DO, add a notion like IFrame preview for each link and also preview user

export default function Post({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

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
      <div className="flex flex-col w-full h-full lg:flex-row">
        <div className="p-8 lg:basis-1/3">
        </div>
        <div className="flex lg:basis-1/3 flex-col items-center">
          <h1 className="text-3xl mb-8 text-center lg:text-5xl">{post.songTitle}</h1>
          <p className="text-base md:text-lg mb-24 lg:text-xl whitespace-pre text-justify tracking-wider">{post.lyrics}</p>

          {post?.links && <h1 className="text-3xl mb-8 text-center lg:text-5xl">External Links</h1>}

          <div className="pb-24">{post?.links?.map(link => <p className="cursor-pointer">{link}</p>)}</div>


        </div>
        <div className="p-4 lg:basis-1/3">
          <div className="flex justify-start w-full gap-2">
            {
              post.tags?.map((tag, index) => <Tag key={index} text={tag} />)
            }
            <Tag text={post.region} />
          </div>
        </div>
      </div>
    )
  }
  else {
    return <NotFound />
  }
}

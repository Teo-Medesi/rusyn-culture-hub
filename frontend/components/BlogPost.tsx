"use client";
import { useUser } from '@/context/UserContext';
import { db } from '@/firebase.config';
import { BlogPost } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import Markdown from "react-markdown"
import { decodeMarkdownFromJSON } from '@/utils';
import Link from 'next/link';

const BlogPost = ({ blogId }: { blogId: string }) => {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // convert from cyrillic to latin or vice-versa
  const [isSwitchToggled, setIsSwitchToggled] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const docRef = doc(db, "blogPosts", blogId);
      const postSnapshot = await getDoc(docRef);

      const post = postSnapshot.data() as BlogPost;

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
        <div className="flex flex-col items-center w-full">
          <Markdown className="prose mb-12">{`# ${post.title}`}</Markdown>
          {post?.coverImage && <img className="w-full lg:w-1/2 aspect-video mb-12" src={post.coverImage} alt="Cover Image" />}
          <Markdown className="prose mb-12 px-4 lg:px-0">{decodeMarkdownFromJSON(post.markdown)}</Markdown>
        </div>
        <div
          role="alert"
          className={`alert flex justify-between fixed left-0 bottom-0 rounded-none transition duration-500 ease-in-out ${user?.uid === post.userId ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
          <div className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>You are the owner of this post!</span>
          </div>
          <Link href={`/app/blog/posts/${blogId}/edit`} className="btn btn-primary">
            EDIT POST
          </Link>
        </div>
      </>
    )
  }
}

export default BlogPost
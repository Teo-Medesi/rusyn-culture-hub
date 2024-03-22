"use client";
import { useUser } from '@/context/UserContext';
import { db } from '@/firebase.config';
import { BlogPost } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import Markdown from "react-markdown"
import { decodeMarkdownFromJSON } from '@/utils';

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
      <div className="flex flex-col items-center w-full">
        <Markdown className="prose mb-12">{`# ${post.title}`}</Markdown>
        <Markdown className="prose mb-12 px-4 lg:px-0">{decodeMarkdownFromJSON(post.markdown)}</Markdown>
      </div>
    )
  }
}

export default BlogPost
"use client";
import { db } from '@/firebase.config';
import { BlogPost } from '@/types';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';

const BlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const postsRef = collection(db, "blogPosts");

    const docSnapshot = await getDocs(postsRef);

    let results = docSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    if (!results) return;

    setIsLoading(false);
    setPosts(results as BlogPost[]);

  };

  if (isLoading) {
    return <Loading />;
  } else if (posts) {
    return (
      <div className="grid grid-cols-4 gap-4 p-4 w-full h-screen">
        {posts.map(post => (
          <Link href={`/app/blog/posts/${post.id}`} className="card w-96 bg-base-100 shadow-xl h-96">
            <figure><img src={post.coverImage} alt="cover image" /></figure>
            <div className="card-body">
              <h2 className="card-title">
                {post.title}
              </h2>
              <p>{post.description}</p>
              <div className="card-actions justify-end">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

export default BlogPosts
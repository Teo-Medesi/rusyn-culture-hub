import { db } from "@/firebase.config";
import { BlogPost, Post } from "@/types";
import { collection, getDocs } from "firebase/firestore";

// just for Ids, for the sitemap
const getBlogPosts = async (): Promise<BlogPost[] | undefined> => {
  const postsRef = collection(db, "blogPosts");


  const docSnapshot = await getDocs(postsRef);

  let results = docSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  if (!results) return;

  return results as BlogPost[];
}

// no filter or search results, just for getting post Ids for the sitemap
const getPosts = async (): Promise<Post[] | undefined> => {
  const postsRef = collection(db, "posts");


  const docSnapshot = await getDocs(postsRef);

  let results = docSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  if (!results) return;

  return results as Post[];
};

export {
  getBlogPosts,
  getPosts
}
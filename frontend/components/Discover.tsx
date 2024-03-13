"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import SearchComponent from "./SearchComponent";
import type { Filter, Post } from "@/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";
import SongTable from "./SongTable";
import Loading from "./Loading";

interface DiscoverType {
  posts: Post[] | null;
  filter: Filter;
  getPosts: () => void;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const defaultFilterValue = {
  alphabetical: "ascending",
  keywords: null,
  region: null,
};

const DiscoverContext = createContext<DiscoverType>({
  posts: null,
  filter: defaultFilterValue,
  getPosts: () => {},
  setFilter: () => {},
});

const Discover = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>(defaultFilterValue);

  useEffect(() => {
    getPosts();
  }, [filter]);

  const getPosts = async () => {
    const postsRef = collection(db, "posts");

    const direction = filter.alphabetical === "descending" ? "desc" : "asc";

    // nice and logical JS way to add filters / constraints to our query without adding too much code
    let queryConstraints = [];

    // filter by region
    switch (filter.region) {
      case "panonia":
        queryConstraints.push(where("region", "==", "panonia"));
        break;
      case "ukraine":
        queryConstraints.push(where("region", "==", "ukraine"));
        break;
      case "poland":
        queryConstraints.push(where("region", "==", "poland"));
        break;
      case "slovakia":
        queryConstraints.push(where("region", "==", "slovakia"));
        break;
      case "romania":
        queryConstraints.push(where("region", "==", "romania"));
        break;
      case "hungary":
        queryConstraints.push(where("region", "==", "hungary"));
        break;
      case "universal":
        queryConstraints.push(where("region", "==", "universal"));
        break;
      case "other":
        queryConstraints.push(where("region", "==", "other"));
        break;
      default:
        break;
    }

    // we just spread our queries like this and it will be the same as if we wrote orderby(), where(), where()...
    const q = query(
      postsRef,
      orderBy("songTitle", direction),
      ...queryConstraints
    );

    const docSnapshot = await getDocs(q);

    const results = docSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    if (process.env.NEXT_PUBLIC_DEBUG) console.log(results);

    if (results) {
      setIsLoading(false);
      setPosts(results as Post[]);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else if (posts)
    return (
      <DiscoverContext.Provider value={{ posts, filter, setFilter, getPosts }}>
        <div className="w-full h-full">
          <SearchComponent
            placeholder="Search songs..."
            className="w-full md:w-1/2 xl:w-1/3 shadow shadow-gray-200"
          />
          <SongTable posts={posts} />
        </div>
      </DiscoverContext.Provider>
    );
};

export const useDiscover = () => useContext(DiscoverContext);
export default Discover;

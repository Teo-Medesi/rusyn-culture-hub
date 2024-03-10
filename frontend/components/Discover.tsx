"use client";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import SearchComponent from './SearchComponent'
import type { Filter, Post } from '@/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase.config';
import SongTable from './SongTable';
import Loading from './Loading';

interface DiscoverType {
    posts: Post[] | null;
    filter: Filter;
    getPosts: () => void;
    setFilter: Dispatch<SetStateAction<Filter>>;
};

const defaultFilterValue = { alphabetical: "ascending", keywords: null, region: null };

const DiscoverContext = createContext<DiscoverType>({posts: null, filter: defaultFilterValue, getPosts: () => {}, setFilter: () => {}});

const Discover = () => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<Filter>(defaultFilterValue);

    useEffect(() => {
        getPosts();
    }, [filter])

    const getPosts = async () => {
        const postsRef = collection(db, "posts");

        const direction = filter.alphabetical === "descending" ? "desc" : "asc"; 
        const q = query(postsRef, orderBy("songTitle", direction));

        const docSnapshot = await getDocs(q);

        const results = docSnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } });

        if (process.env.NEXT_PUBLIC_DEBUG) console.log(results);

        if (results) {
            setIsLoading(false);
            setPosts(results as Post[])
        }

    }

    if (isLoading) {
        return <Loading />
    }
    else if (posts) return (
        <DiscoverContext.Provider value={{posts, filter, setFilter, getPosts}}>
            <div className='w-full h-full'>
                <SearchComponent placeholder='Search songs...' className='w-full md:w-1/2 xl:w-1/3 shadow shadow-gray-200' />
                <SongTable posts={posts} />
            </div>
        </DiscoverContext.Provider>
    )
}

export const useDiscover = () => useContext(DiscoverContext);
export default Discover
"use client";
import { useEffect, useState } from 'react'
import SearchComponent from './SearchComponent'
import type { Post } from '@/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';
import SongTable from './SongTable';
import Loading from './Loading';

const Discover = () => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!posts && isLoading) {
            getPosts();
        }
    }, [])

    const getPosts = async () => {
        const collectionRef = collection(db, "posts");
        const docSnapshot = await getDocs(collectionRef);

        const results = docSnapshot.docs.map(doc => { return {...doc.data(), id: doc.id }});

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
        <div className='w-full h-full'>
            <SearchComponent placeholder='Search songs...' className='w-full md:w-1/2 xl:w-1/3 shadow shadow-gray-200' />
            <SongTable posts={posts} />
        </div>
    )
}

export default Discover
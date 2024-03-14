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
import Fuse from "fuse.js"
import { isCyrillic, transliterateToCyrillic } from "@/utils";

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
    getPosts: () => { },
    setFilter: () => { },
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
        if (filter.region) {
            queryConstraints.push(where("region", "==", filter.region));
        }

        // we just spread our queries like this and it will be the same as if we wrote orderby(), where(), where()...
        const q = query(
            postsRef,
            orderBy("songTitle", direction),
            ...queryConstraints
        );

        const docSnapshot = await getDocs(q);

        let results = docSnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });

        if (!results) return;

        // search results
        let keywords = filter.keywords;
        if (keywords) {

            // transliterate latin alphabet to ruthenian cyrillic
            if (!isCyrillic(keywords)) {
                keywords = transliterateToCyrillic(keywords);
                console.log("transliterated", keywords);
            }

            // keys are the keywords we are looking for, distance sets the maximum allowed distance between the search term and a match, threshold is when does fuse give up ( 0.0 is a perfect match)
            const options = {
                keys: ['songTitle'],
                threshold: 0.3,
                location: 0,
                distance: 30,
                useExtendedSearch: true
            };

            const fuse = new Fuse(results, options);
            const searchResult = fuse.search(keywords);

            // fuse doesn't return the same array as the search array, so we need to extract the items from it
            const newResults = searchResult.map(element => element.item)

            results = newResults;
        }

        setIsLoading(false);
        setPosts(results as Post[]);

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
                        onChange={search => setFilter((prevState) => ({ ...prevState, keywords: search }))}
                    />
                    <SongTable posts={posts} />
                </div>
            </DiscoverContext.Provider>
        );
};

export const useDiscover = () => useContext(DiscoverContext);
export default Discover;

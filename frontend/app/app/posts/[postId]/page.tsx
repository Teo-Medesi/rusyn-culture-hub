import Post from "@/components/Post";
import { db } from "@/firebase.config";
import { Post as PostType } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { Metadata, ResolvingMetadata } from "next";

export default function PostPage({ params }: { params: { postId: string } }) {
    return <Post postId={params.postId} />
}

type Props = {
    params: { postId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const id = params.postId

    // fetch data

    const docRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(docRef);

    const post = postSnapshot.data() as PostType;
    const previousImages = (await parent).openGraph?.images || []

    if (post) {
        return {
            title: `${post.songTitle} - Ruthenia`,
            description: post.lyrics,
            keywords: [post.region, "Rusyn", "Ruthenian", "Rusyn Music"],
            openGraph: {
                images: [...previousImages],
              },
        }
    }
    
    return {
        title: "Song Post - Ruthenia",
        description: "Delve into the fascinating world of Rusyn music!"
    }
}
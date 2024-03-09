import Post from "@/components/Post";

export default function PostPage({ params }: { params: { postId: string } }) {
    return <Post postId={params.postId} />
}
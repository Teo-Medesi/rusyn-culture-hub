import { EditPost } from "@/components";

export default function EditPostPage({ params }: { params: { postId: string } }) {
    return <EditPost postId={params.postId} />
}   
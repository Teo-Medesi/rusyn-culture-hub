export default function Post({ params }: { params: { postId: string } }) {
    return (
        <div>
            post: {params.postId}
        </div>
    )
}
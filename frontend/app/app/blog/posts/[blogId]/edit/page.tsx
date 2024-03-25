import EditBlogPost from "@/components/EditBlogPost";

export default function EditBlogPostPage({ params }: { params: { blogId: string } }) {
    return <EditBlogPost blogPostId={params.blogId} />;
}

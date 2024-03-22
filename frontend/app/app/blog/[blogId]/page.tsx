import BlogPost from "@/components/BlogPost";

export default async function BlogPostPage({ params }: { params: { blogId: string } }) {
  return <BlogPost blogId={params.blogId}/>
}
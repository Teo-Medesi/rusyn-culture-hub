import { getBlogPosts, getPosts } from "@/lib";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL = "https://ruthenia.vercel.app";

  let sitemap: MetadataRoute.Sitemap = [
    {
      url: `${URL}/app`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${URL}/app/songs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${URL}/app/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${URL}/app/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${URL}/app/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]

  const blogPosts = await getBlogPosts();
  if (blogPosts) {
    const blogPostsUrls: MetadataRoute.Sitemap = blogPosts.map(post => ({
      url: `${URL}/app/blog/posts/${post.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }));

    sitemap = [...sitemap, ...blogPostsUrls];
  }

  const posts = await getPosts();
  if (posts) {
    const postsUrls: MetadataRoute.Sitemap = posts.map(post => ({
      url: `${URL}/app/songs/${post.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }))

    sitemap = [...sitemap, ...postsUrls];
  }

  return sitemap;
}
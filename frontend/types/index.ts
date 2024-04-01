interface Post {
    id?: string;
    songTitle: string;
    region: string;
    lyrics: string;
    links?: string[];
    files?: File[];
    tags?: string[];
    userId: string;
}

interface NewsletterUser {
    id?: string;
    name: string;
    email: string;
}

interface BlogPost {
    id?: string;
    title: string;
    description: string;
    markdown: string;
    userId: string;
    coverImage: string;
}

interface Filter {
    alphabetical: "ascending" | "descending" | string;
    region: "panonia" | "ukraine" | "poland" | "slovakia" | "romania" | "hungary" | "all" | string | null;
    keywords: string | null;
}

export type {
    NewsletterUser,
    Post,
    BlogPost,
    Filter
}

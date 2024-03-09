

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

export type {
    Post
}
  
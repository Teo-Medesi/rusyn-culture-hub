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

interface Filter {
    alphabetical: "ascending" | "descending" | string;
    region: "panonia" | "ukraine" | "poland" | "slovakia" | "romania" | "hungary" | "all" | string | null;
    keywords: string | null;
}

export type {
    Post,
    Filter
}

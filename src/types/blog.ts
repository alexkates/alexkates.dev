export type BlogTag = {
  name: string;
  postsCount: number;
};

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  readTimeInMinutes: number;
  tags: string[];
  coverImage: string | null;
  draft: boolean;
  markdown: string;
};

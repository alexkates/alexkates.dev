type BlogPost = {
  id: string;
  publishedAt: string;
  readTimeInMinutes: number;
  slug: string;
  subtitle: string;
  title: string;
  views: number;
  coverImage: {
    url: string;
  };
  content: {
    markdown: string;
  };
  seo?: {
    title: string;
    description: string;
  };
  publication: {
    id: string;
  };
};

export default BlogPost;

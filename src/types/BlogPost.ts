type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  views: number;
  publishedAt: string;
  coverImage: {
    url: string;
  };
  content: {
    html: string;
    markdown: string;
    text: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export default BlogPost;

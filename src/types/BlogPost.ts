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
};

export default BlogPost;

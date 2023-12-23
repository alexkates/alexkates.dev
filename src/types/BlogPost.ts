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
};

export default BlogPost;

import BlogPost from "./blog-post";
import PageInfo from "./page-info";

type BlogPostsPage = {
  blogPosts: BlogPost[];
  pageInfo: PageInfo;
};

export default BlogPostsPage;

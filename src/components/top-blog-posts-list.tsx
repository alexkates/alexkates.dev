import { getAllPosts } from "@/lib/blog";
import BlogPostList from "./blog-post-list";

function TopBlogPostsList() {
  const posts = getAllPosts().slice(0, 4);

  return <BlogPostList posts={posts} />;
}

export default TopBlogPostsList;

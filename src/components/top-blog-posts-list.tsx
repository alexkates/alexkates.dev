import getAllBlogPosts from "@/server/get-all-blog-posts";
import BlogPostList from "./blog-post-list";

async function TopBlogPostsList() {
  const posts = (await getAllBlogPosts()).toSorted((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 4);

  return <BlogPostList posts={posts} />;
}

export default TopBlogPostsList;

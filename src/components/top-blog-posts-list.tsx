import TopBlogPosts from "@/data/top-blog-posts";
import fetchBlogPost from "@/server/get-blog-post";
import BlogPostList from "./blog-post-list";

async function TopBlogPostsList() {
  const posts = await Promise.all(TopBlogPosts.map((slug) => fetchBlogPost({ slug })));

  return <BlogPostList posts={posts} />;
}

export default TopBlogPostsList;

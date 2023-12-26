import BlogPostList from "@/components/blog-post-list";
import Search from "@/components/search";
import fetchBlogPosts from "@/server/fetchBlogPosts";

export default async function Home() {
  const posts = await fetchBlogPosts();

  return (
    <main className="flex flex-col gap-y-2">
      <Search placeholder="Search blog posts..." />
      <BlogPostList posts={posts} />
    </main>
  );
}

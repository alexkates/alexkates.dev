import BlogPostList from "@/components/blog-post-list";
import fetchBlogPosts from "@/server/fetchBlogPosts";

export default async function Home() {
  const posts = await fetchBlogPosts();

  return (
    <main>
      <section>
        <BlogPostList posts={posts} />
      </section>
    </main>
  );
}

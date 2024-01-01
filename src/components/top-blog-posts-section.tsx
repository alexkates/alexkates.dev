import TopBlogPosts from "@/data/top-blog-posts";
import fetchBlogPost from "@/server/fetchBlogPost";
import { Suspense } from "react";
import BlogPostList from "./blog-post-list";

export async function TopBlogPostsSection() {
  const posts = await Promise.all(TopBlogPosts.map(fetchBlogPost));

  console.log({ posts });

  return (
    <div className="mt-8 flex flex-col gap-2">
      <section className="prose prose-neutral dark:prose-invert">
        <p>I also write about things I build. Check out some of my recent posts.</p>
      </section>
      <Suspense fallback={"Loading..."}>
        <BlogPostList posts={posts} />
      </Suspense>
    </div>
  );
}

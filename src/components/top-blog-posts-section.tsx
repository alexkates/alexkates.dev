import fetchBlogPost from "@/server/fetchBlogPost";
import { Suspense } from "react";
import BlogPostList from "./blog-post-list";

async function TopBlogPostsSection() {
  const blogPostSlugs = [
    "server-side-rendering-ssr-with-bun-and-react",
    "how-we-scaled-the-credit-genie-platform-with-aws-serverless",
    "introducing-guaranteed-buybacks-with-the-croissant-chrome-extension",
    "how-to-trigger-an-aws-cloudwatch-alarm-from-a-lambda-function",
  ];

  const posts = await Promise.all(blogPostSlugs.map(fetchBlogPost));

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

export default TopBlogPostsSection;

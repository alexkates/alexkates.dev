import { getMarkdownForPath } from "@/lib/agent-markdown";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const pages = ["/", "/about", "/contact", "/projects", "/oss", "/games", "/resume", "/privacy"];

export function GET() {
  const documents = [
    ...pages.map((path) => getMarkdownForPath(path).body),
    "# Blog\n\n> Notes on software, products, and things Alex has learned while building.\n",
    ...getAllPosts().map((post) => getMarkdownForPath(`/blog/${post.slug}`).body),
  ];

  return new Response(documents.join("\n\n---\n\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

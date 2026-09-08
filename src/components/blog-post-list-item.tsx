import { formatDate } from "@/lib/format-date";
import { BlogPost } from "@/types/blog";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BlogPostListItem({ post }: { post: BlogPost }) {
  return (
    <li className="blog-list-item">
      <article>
        <Link href={`/blog/${post.slug}`}>
          <div className="blog-list-meta">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>{post.readTimeInMinutes} min read</span>
          </div>
          <div className="project-caption">
            <h2>{post.title}</h2>
            <ArrowUpRight aria-hidden="true" />
          </div>
          <p>{post.description}</p>
        </Link>
      </article>
    </li>
  );
}

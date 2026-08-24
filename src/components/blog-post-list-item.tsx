import { formatDate } from "@/lib/format-date";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Props = {
  post: BlogPost;
};

export default function BlogPostListItem({ post }: Props) {
  return (
    <li>
      <article className="flex flex-col gap-4 rounded-2xl border bg-muted/20 p-5 transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:-translate-y-1 hover:border-foreground/20 hover:bg-muted/35 hover:shadow-lg">
        <div className="flex flex-col gap-2">
          <h3>
            <Link
              href={`/blog/${post.slug}`}
              className="rounded-sm text-balance text-lg font-semibold leading-snug underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {post.title}
            </Link>
          </h3>
          <div className="flex items-center gap-2 text-xs tabular-nums text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTimeInMinutes} min read</span>
          </div>
        </div>
        <p className="line-clamp-3 text-pretty text-sm leading-6 text-muted-foreground">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </li>
  );
}

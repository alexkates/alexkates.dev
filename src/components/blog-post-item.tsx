import { cn } from "@/lib/utils";
import BlogPost from "@/types/blog-post";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Props = {
  post: BlogPost;
};

export default function BlogPostItem({ post }: Props) {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  const scrubbedTags = post.tags?.sort((a, b) => a.name.localeCompare(b.name)).map((tag) => tag.name.toLocaleLowerCase());

  return (
    <li className={cn("flex flex-col items-center rounded-lg", fadeIn)}>
      <Link href={`/blog/${post.slug}`} className="transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="flex justify-between text-xs prose prose-neutral dark:prose-invert">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>{post.views.toLocaleString()} views</span>
        </div>
        <Image width={500} height={150} alt={post.title} src={post.coverImage.url} className="rounded-lg" />
        <div className="flex prose prose-neutral dark:prose-invert flex-wrap gap-x-2 mt-2">
          {scrubbedTags?.map((tag) => (
            <Badge variant={"secondary"} className="text-xs" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </li>
  );
}

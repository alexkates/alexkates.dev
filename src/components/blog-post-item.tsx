import { cn } from "@/lib/utils";
import BlogPost from "@/types/blog-post";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: BlogPost;
};

export default function BlogPostItem({ post }: Props) {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";

  return (
    <li className={cn("flex flex-col items-center rounded-lg", fadeIn)}>
      <Link href={`/blog/${post.slug}`} className="transition-transform duration-300 ease-in-out hover:scale-105">
        <Image width={500} height={150} alt={post.title} src={post.coverImage.url} className="rounded-lg" />
        <div className="flex w-full justify-between text-xs">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>{post.views.toLocaleString()} views</span>
        </div>
      </Link>
    </li>
  );
}

import { cn } from "@/lib/utils";
import BlogPost from "@/types/blog-post";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardFooter, CardHeader } from "./ui/card";

type Props = {
  post: BlogPost;
};

export default function BlogPostItem({ post }: Props) {
  const fadeIn = "animate-in fade-in duration-1000 fill-mode-both";
  return (
    <li className={cn("flex flex-col items-center", fadeIn)}>
      <Link href={`/blog/${post.slug}`}>
        <Card className="transition-transform duration-300 ease-in-out hover:scale-[1.025]">
          <CardHeader>
            <Image width={500} height={150} alt={post.title} src={post.coverImage.url} className="rounded-md" />
          </CardHeader>
          <CardFooter className="flex flex-col gap-y-1">
            <div className="flex w-full justify-end text-xs prose prose-neutral dark:prose-invert">
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span className="mx-1">•</span>
              <span>{post.views.toLocaleString()} views</span>
              <span className="mx-1">•</span>
              <span>{post.readTimeInMinutes} min read</span>
            </div>
            <div className="flex w-full prose prose-neutral dark:prose-invert gap-x-2 justify-end">
              {post.tags.map((tag) => (
                <Badge key={tag.name} variant="outline" className="text-[8px]">
                  {tag.name.toLocaleLowerCase()}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}

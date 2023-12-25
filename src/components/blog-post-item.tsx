import BlogPost from "@/types/BlogPost";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: BlogPost;
};

export default function BlogPostItem({ post }: Props) {
  return (
    <li className="flex flex-col items-center">
      <div className="flex flex-col items-center rounded-lg p-2 transition-transform duration-300 ease-in-out hover:scale-105">
        <Link href={`/blog/${post.slug}`}>
          <Image width={500} height={150} alt={post.title} src={post.coverImage.url} className="rounded-lg" />
          <div className="flex w-full justify-between text-xs">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span>{post.views.toLocaleString()} views</span>
          </div>
        </Link>
      </div>
    </li>
  );
}

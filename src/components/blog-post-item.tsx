import BlogPost from "@/types/BlogPost";
import Image from "next/image";

type Props = {
  post: BlogPost;
};

export default function BlogPostItem({ post }: Props) {
  return (
    <li className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <Image
          width={250}
          height={150}
          alt={post.title}
          src={post.coverImage.url}
        />
        <div className="flex justify-between w-full text-xs text-muted-foreground">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>{post.views.toLocaleString()} views</span>
        </div>
      </div>
    </li>
  );
}

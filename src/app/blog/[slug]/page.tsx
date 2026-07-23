import { Mdx } from "@/components/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import createPostJsonLd from "@/lib/create-post-json-ld";
import { formatDate } from "@/lib/format-date";
import { cn, fadeIn } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) return {};

  const { title, description } = post;
  const images = post.coverImage ?? undefined;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Alex Kates | Blog",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
      creator: "@thealexkates",
    },
  };

  return metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) notFound();

  const jsonLd = createPostJsonLd(post);

  const { coverImage, publishedAt, readTimeInMinutes, title, markdown } = post;

  return (
    <>
      <header className={cn(fadeIn, "animation-delay-200 mb-8 overflow-hidden rounded-[2rem] border bg-muted/20")}>
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Article</p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <div className="flex items-center gap-2 text-xs tabular-nums text-muted-foreground">
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{readTimeInMinutes} min read</span>
          </div>
        </div>
        {coverImage ? (
          <Image src={coverImage} alt="" width={1200} height={630} priority className="aspect-[1.9/1] w-full border-t object-cover" />
        ) : null}
      </header>
      <article className={cn(fadeIn, "animation-delay-400 rounded-[2rem] border bg-muted/10 p-6 sm:p-8")}>
        <Mdx code={markdown} />
      </article>
      <script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

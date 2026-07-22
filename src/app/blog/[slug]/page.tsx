import { Mdx } from "@/components/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import createPostJsonLd from "@/lib/create-post-json-ld";
import { cn, fadeIn } from "@/lib/utils";
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

  const { publishedAt, readTimeInMinutes, title, markdown } = post;

  return (
    <>
      <section className={cn(fadeIn, "animation-delay-200 mb-8 flex flex-col gap-1")}>
        <h1 className="text-3xl font-bold">{title}</h1>
        <h3 className="text-xs font-light">
          {new Date(publishedAt).toLocaleDateString()} • {readTimeInMinutes} min read
        </h3>
      </section>
      <article className={cn(fadeIn, "animation-delay-400")}>
        <Mdx code={markdown} />
      </article>
      <script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

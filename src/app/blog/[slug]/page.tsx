import Analytics from "@/components/analytics";
import { Mdx } from "@/components/mdx";
import fetchBlogPost from "@/server/fetchBlogPost";
import { Metadata } from "next/types";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const post = await fetchBlogPost(params.slug);
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.subtitle || post.title;
  const siteName = "https://alexkates.dev";
  const url = `${siteName}/blog/${params.slug}`;
  const images = post.coverImage.url;

  const metadata: Metadata = {
    alternates: {
      canonical: url,
    },
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName,
      url,
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

export default async function Page({ params }: Props) {
  const {
    publishedAt,
    readTimeInMinutes,
    title,
    views,
    id: postId,
    publication: { id: publicationId },
    content: { markdown },
  } = await fetchBlogPost(params.slug);

  return (
    <section>
      <span className="mb-8 flex flex-col gap-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h3 className="text-xs font-light">
          {new Date(publishedAt).toLocaleDateString()} • {views} views • {readTimeInMinutes} min read
        </h3>
      </span>
      <article>
        <Mdx code={markdown} />
      </article>
      <Analytics postId={postId} publicationId={publicationId} />
    </section>
  );
}

import fetchBlogPost from "@/server/fetchBlogPost";
import { Mdx } from "@/components/mdx";
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
    title,
    subtitle,
    publishedAt,
    views,
    content: { markdown },
  } = await fetchBlogPost(params.slug);

  return (
    <section>
      <span className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h2>{subtitle}</h2>
        <h3 className="text-sm font-light">
          {new Date(publishedAt).toLocaleDateString()} • {views} views
        </h3>
      </span>
      <article>
        <Mdx code={markdown} />
      </article>
    </section>
  );
}

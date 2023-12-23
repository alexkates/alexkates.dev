import fetchBlogPost from "@/server/fetchBlogPost";

export default async function Page({ params }: { params: { slug: string } }) {
  const {
    content: { html },
  } = await fetchBlogPost("alexkates.dev", params.slug);

  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}

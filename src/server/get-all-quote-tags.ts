import QuoteTag from "@/types/quote-tag";

export default async function getAllQuoteTags() {
  const endpoint = `https://api.quotable.io/tags`;

  const response = await fetch(endpoint);

  if (!response.ok) throw new Error("Failed to fetch quote tags");

  const tags = (await response.json()) as {
    slug: string;
    quoteCount: number;
  }[];

  if (!tags || !tags.length) throw new Error("Failed to fetch quote tags");

  return tags
    .filter((quoteTag) => quoteTag.quoteCount > 0)
    .map((quoteTag) => ({
      name: quoteTag.slug.toLocaleLowerCase(),
      count: quoteTag.quoteCount,
    })) as QuoteTag[];
}

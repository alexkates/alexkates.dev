import Quote from "@/types/quote";

type Props = {
  tags?: string;
  limit?: number;
};

export default async function fetchRandomQuotes({ tags, limit }: Props) {
  const searchParams = new URLSearchParams();
  if (tags) searchParams.set("tags", tags);
  if (limit) searchParams.set("limit", limit.toString());

  const endpoint = `https://api.quotable.io/quotes/random?${searchParams.toString()}`;

  const response = await fetch(endpoint, { next: { tags: ["quotes"] } });

  if (!response.ok) return undefined;

  const quotes = (await response.json()) as Quote[] | undefined;

  return quotes ?? [];
}

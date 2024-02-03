import fetchRandomQuotes from "@/server/get-random-quotes";
import QuoteListItem from "./quote-list-item";

type Props = {
  tags: string;
  limit?: number;
};

async function QuoteList({ tags, limit }: Props) {
  const quotes = await fetchRandomQuotes({
    tags,
    limit,
  });

  return (
    <ul className="flex flex-col gap-8">
      {quotes?.map((quote) => (
        <li key={quote._id}>
          <QuoteListItem quote={quote} />
        </li>
      ))}
    </ul>
  );
}

export default QuoteList;

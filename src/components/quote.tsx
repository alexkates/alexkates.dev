import Quote from "@/types/quote";

function Quote({ quote }: { quote?: Quote }) {
  if (!quote)
    return (
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mt-0">No quote found.</p>
      </div>
    );

  return (
    <div className="prose prose-neutral dark:prose-invert">
      <blockquote>
        <p className="mt-0">{quote?.content}</p>
        <cite>{quote?.author}</cite>
      </blockquote>
    </div>
  );
}

export default Quote;

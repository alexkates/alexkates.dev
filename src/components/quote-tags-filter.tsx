import getAllQuoteTags from "@/server/get-all-quote-tags";
import Filter from "./filter";

async function QuoteTagsFilter() {
  const allTags = await getAllQuoteTags();

  return <Filter tags={allTags.map((tag) => ({ name: tag.name, postsCount: tag.count }))} />;
}

export default QuoteTagsFilter;

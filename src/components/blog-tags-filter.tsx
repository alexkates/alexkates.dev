import { getAllTags } from "@/lib/blog";
import Filter from "./filter";

async function BlogTagsFilter() {
  const allTags = getAllTags();

  return <Filter tags={allTags} />;
}

export default BlogTagsFilter;

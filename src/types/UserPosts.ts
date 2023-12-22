import PostNode from "./PostNode";
import PageInfo from "./PageInfo";

type UserPosts = {
  pageInfo: PageInfo;
  edges: Array<{ node: PostNode }>;
};

export default UserPosts;

import BlogPost from "@/types/BlogPost";

export default async function fetchBlogPosts(
  username = "thealexkates",
  pageSize = 20,
  page = 1
): Promise<BlogPost[]> {
  const endpoint = "https://gql.hashnode.com/";
  const query = {
    query: `{
            user(username: "${username}") {
                posts(pageSize: ${pageSize}, page: ${page}) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        previousPage
                        nextPage
                    }
                    edges {
                        node {
                          id
                          slug
                          title
                          subtitle
                        }
                    }
                }
            }
        }`,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = (await response.json()) as {
      data: FetchBlogPostsData;
    };

    return data.user.posts.edges.map((e) => e.node);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

type FetchBlogPostsData = {
  user: User;
};

type User = {
  posts: Posts;
};

type Posts = {
  pageInfo: PageInfo;
  edges: Edge[];
};

type Edge = {
  node: BlogPost;
};

type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  previousPage?: any;
  nextPage: number;
};

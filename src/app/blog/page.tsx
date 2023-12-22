import GraphQLResponse from "@/types/GraphQLResponse";
import UserPosts from "@/types/UserPosts";

export default async function Home() {
  type FetchPostsRequest = {
    username: string;
    pageSize: number;
    page: number;
  };

  async function fetchPosts({
    username,
    pageSize,
    page,
  }: FetchPostsRequest): Promise<UserPosts> {
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

      const { data }: GraphQLResponse<{ user: { posts: UserPosts } }> =
        await response.json();

      return data.user.posts;
    } catch (error) {
      console.error("Error fetching user posts:", error);
      throw error;
    }
  }

  const posts = await fetchPosts({
    username: "thealexkates",
    pageSize: 10,
    page: 1,
  });

  return (
    <main>
      <h1>blog</h1>
      <ul>
        {posts.edges.map((post) => (
          <li key={post.node.id}>
            <a href={`https://thealexkates.hashnode.dev/${post.node.slug}`}>
              {post.node.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

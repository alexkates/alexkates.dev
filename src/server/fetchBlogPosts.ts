import BlogPost from "@/types/blog-post";
import BlogPostsPage from "@/types/blog-posts-page";
import PageInfo from "@/types/page-info";

type Props = {
  first?: number;
  after?: string;
};

export default async function fetchBlogPosts({ first = 20, after = "" }: Props = {}): Promise<BlogPostsPage> {
  const publicationId = process.env.HASHNODE_PUBLICATION_ID;
  const endpoint = "https://gql.hashnode.com/";
  const query = {
    query: `{
  publication(id: "${publicationId}") {
    posts(first: ${first}, after: "${after}") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          slug
          title
          subtitle
          publishedAt
          readTimeInMinutes
          views
          content {
            markdown
            text
          }
          seo {
            title
            description
          }
          coverImage {
            url
          }
          publication {
            id
          }
          tags {
            name
            postsCount
          }
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
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${await response.text()}`);
    }

    const { data } = (await response.json()) as {
      data: FetchBlogPostsData;
    };

    return {
      blogPosts: data.publication.posts.edges.map((e) => e.node),
      pageInfo: data.publication.posts.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

type FetchBlogPostsData = {
  publication: Publication;
};

type Publication = {
  posts: Posts;
};

type Posts = {
  pageInfo: PageInfo;
  edges: Edge[];
};

type Edge = {
  node: BlogPost;
};

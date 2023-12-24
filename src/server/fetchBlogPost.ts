import BlogPost from "@/types/BlogPost";

export default async function fetchBlogPost(
  host = "alexkates.dev",
  slug: string
): Promise<BlogPost> {
  const endpoint = "https://gql.hashnode.com/";
  const query = {
    query: `{
      publication(host: "${host}") {
        post(slug: "${slug}") {
          title
          subtitle
          publishedAt
          views
          content {
            html
            markdown
          }
          seo {
            title
            description
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
      data: Data;
    };

    return data.publication.post as BlogPost;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}

interface Data {
  publication: Publication;
}

interface Publication {
  post: Post;
}

interface Post {
  content: Content;
}

interface Content {
  html: string;
}

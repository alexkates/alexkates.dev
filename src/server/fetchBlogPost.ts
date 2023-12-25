import BlogPost from "@/types/BlogPost";

export default async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const endpoint = "https://gql.hashnode.com/";
  const query = {
    query: `{
      publication(id: "610c80b2528eff11aea86afd") {
        post(slug: "${slug}") {
          id
          title
          subtitle
          publishedAt
          readTimeInMinutes
          views
          content {
            markdown
          }
          seo {
            title
            description
          }
          coverImage{
            url
          }
          publication {
            id
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
  markdown: string;
}

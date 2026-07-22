import profile from "@/data/profile";

export const createPublicationJsonLd = () => {
  const siteUrl = "https://alexkates.dev";
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Blog",
    "@id": `${siteUrl}/blog`,
    mainEntityOfPage: `${siteUrl}/blog`,
    name: "Alex Kates | Blog",
    description: "Articles by Alex Kates about building software and products.",
    publisher: {
      "@type": "Person",
      "@id": siteUrl,
      name: profile.name,
      image: {
        "@type": "ImageObject",
        url: `${siteUrl}/headshot.png`,
      },
    },
  };
  return schema;
};

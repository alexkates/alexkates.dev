import profile from "@/data/profile";

export default function createPersonJsonLd() {
  const siteUrl = profile.links.website;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    description:
      "Product engineer and founding engineer at Croissant with 15 years of experience building products for fintech and e-commerce startups.",
    url: siteUrl,
    image: `${siteUrl}/headshot.png`,
    jobTitle: "Product engineer",
    homeLocation: {
      "@type": "Place",
      name: "Philadelphia, Pennsylvania",
    },
    worksFor: {
      "@type": "Organization",
      name: "Croissant",
      url: "https://croissant.com",
    },
    sameAs: [profile.links.github, profile.links.twitter, profile.links.linkedin, profile.links.stackoverflow],
  };
}

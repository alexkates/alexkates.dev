import profile from "@/data/profile";

export default function createOrganizationJsonLd() {
  const siteUrl = profile.links.website;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: profile.name,
    url: siteUrl,
    description: "Personal site, resume, open-source project index, and technical blog of Alex Kates, a product engineer in Philadelphia.",
    logo: `${siteUrl}/opengraph-image.png`,
    image: `${siteUrl}/headshot.png`,
    founder: { "@id": `${siteUrl}/#person` },
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: profile.email,
        contactType: "general inquiries",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [profile.links.github, profile.links.twitter, profile.links.linkedin, profile.links.stackoverflow],
  };
}

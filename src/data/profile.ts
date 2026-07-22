const profile = {
  name: "Alex Kates",
  headline: "I build software, travel whenever I can, and feel most at home outside.",
  bio: [
    "I'm Alex, a product engineer and founding engineer at Croissant. I like taking ideas from rough sketches to useful products, especially when the path from zero to one is still messy.",
    "When I'm away from a keyboard, you'll usually find me traveling, hiking, rock climbing, or looking for an excuse to spend the day outside.",
  ],
  interests: ["Building software", "Travel", "Hiking", "Rock climbing"],
  links: {
    website: "https://alexkates.dev",
    github: "https://github.com/alexkates",
    twitter: "https://x.com/thealexkates",
    stackoverflow: "https://stackoverflow.com/users/3149835/alex?tab=profile",
    linkedin: "https://www.linkedin.com/in/alexanderkates",
  },
} as const;

export default profile;

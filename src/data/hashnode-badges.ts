export type HashnodeBadge = {
  awardedAt: string;
  description: string;
  id: string;
  image: string;
  name: string;
};

const hashnodeBadges: HashnodeBadge[] = [
  {
    id: "ai-for-tomorrow-hackathon",
    name: "AI for Tomorrow Hackathon",
    awardedAt: "2024-08-12",
    description: "Badge assigned for participating in AI for Tomorrow Hackathon in July 2024.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1723103040756/SyXZDeHEe.png?auto=format",
  },
  {
    id: "word-warrior",
    name: "Word Warrior",
    awardedAt: "2023-11-27",
    description: "Wrote an in-depth blog post with more than 2K words.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1696319757778/s7nOYDsve.png?auto=compress",
  },
  {
    id: "hasura-hackathon",
    name: "Hasura Hackathon",
    awardedAt: "2022-05-19",
    description: "Badge assigned for participating in Hashnode + Hasura Hackathon in March 2022.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1652859768206/kwUwXFc5V.png?auto=compress",
  },
  {
    id: "netlify-hackathon",
    name: "Netlify Hackathon",
    awardedAt: "2022-05-19",
    description: "Badge assigned for participating in Hashnode + Netlify Hackathon in February 2022.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1652859787499/vxe2fphD1.png?auto=compress",
  },
  {
    id: "two-articles-one-week-bronze",
    name: "#2Articles1Week Bronze Badge",
    awardedAt: "2022-03-28",
    description: "Maintained a writing streak for 2 weeks.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1696319573776/GrjSzEUu4.png?auto=compress",
  },
  {
    id: "featured-on-hashnode",
    name: "Featured On Hashnode",
    awardedAt: "2022-01-19",
    description: "Wrote a post that was featured on Hashnode.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1638537289044/KeDRCKlY_.png?auto=compress",
  },
  {
    id: "self-starter",
    name: "Self Starter",
    awardedAt: "2022-01-15",
    description: "Wrote a blog post after joining Hashnode.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1696319802391/hvWFt1_AU.png?auto=compress",
  },
];

export default hashnodeBadges;

import Project from "@/types/project";

const OSSProjects: Project[] = [
  {
    name: "HelloNature",
    url: "https://hellonature.app",
    description: "See nature through a new lens. Discover and share wildlife with fellow naturalists.",
    image: {
      src: "/hellonature.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "Hashnode Next",
    description: "The fastest way to go headless with Hashnode.",
    url: "https://hashnode-next.dev",
    image: {
      src: "/hashnode-next.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "DynamoDB Extended",
    description: "Query history, favorites, and better defaults for AWS DynamoDB Console.",
    url: "https://dynamodb-extended.app",
    image: {
      src: "/dynamodb-extended.png",
      width: 1200,
      height: 630,
    },
  },
  {
    name: "OG Tester",
    description: "Trust your Open Graph tags. OG Tester helps you preview your site's meta tags.",
    url: "https://ogtester.app",
    image: {
      src: "/ogtester.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "React Email Tester",
    description: "Create and test React Email templates with live preview.",
    url: "https://www.react-email-tester.app",
    image: {
      src: "/react-email-tester.png",
      width: 1200,
      height: 630,
    },
  },
];

export default OSSProjects;

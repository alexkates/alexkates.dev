import Project from "@/types/project";

const OSSProjects: Project[] = [
  {
    name: "HelloNature",
    url: "https://hellonature.app",
    description: "An app for sharing wildlife sightings.",
    image: {
      src: "/hellonature.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "Hashnode Next",
    description: "A Next.js starter for blogs using the Hashnode API.",
    url: "https://hashnode-next.dev",
    image: {
      src: "/hashnode-next.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "DynamoDB Extended",
    description: "Saved queries and query history for the DynamoDB console.",
    url: "https://dynamodb-extended.app",
    image: {
      src: "/dynamodb-extended.png",
      width: 1200,
      height: 630,
    },
  },
  {
    name: "OG Tester",
    description: "A tool for checking Open Graph tags and link previews.",
    url: "https://ogtester.app",
    image: {
      src: "/ogtester.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "React Email Tester",
    description: "An editor with live previews for React Email templates.",
    url: "https://www.react-email-tester.app",
    image: {
      src: "/react-email-tester.png",
      width: 1200,
      height: 630,
    },
  },
];

export default OSSProjects;

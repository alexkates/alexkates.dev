import Project from "@/types/project";

const Projects: Project[] = [
  {
    name: "Croissant iOS App",
    description: "An iOS app for tracking purchases and claiming buybacks.",
    url: "https://apps.apple.com/us/app/croissant/id1662287582",
    image: {
      src: "/croissant-ios-app.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "Croissant Chrome Extension",
    description: "A Chrome extension that shows buyback offers while you shop.",
    url: "https://chromewebstore.google.com/detail/croissant/gjfmgjljebjajpclcnoioflckcdejgld?pli=1",
    image: {
      src: "/croissant-share.png",
      width: 1080,
      height: 567,
    },
  },
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
  {
    name: "FitGPT",
    description: "An AI app that generates workout and meal plans.",
    url: "https://fitgpt.xyz",
    image: {
      src: "/fitgpt.png",
      width: 1080,
      height: 567,
    },
  },
];

export default Projects;

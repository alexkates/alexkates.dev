import Project from "@/types/project";

const Projects: Project[] = [
  {
    name: "Croissant iOS App",
    description: "See what your things are worth. Sell them when you're ready.",
    url: "https://apps.apple.com/us/app/croissant/id1662287582",
    image: {
      src: "/croissant-ios-app.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "Croissant Chrome Extension",
    description: "Know what you can get back before you buy.",
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
    description: "Find and share the wildlife around you.",
    image: {
      src: "/hellonature.png",
      width: 1080,
      height: 567,
    },
  },

  {
    name: "Hashnode Next",
    description: "Your Hashnode blog, with a front end of your own.",
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
    description: "Check how your site looks when someone shares it.",
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
  {
    name: "FitGPT",
    description: "Make a workout and meal plan with AI.",
    url: "https://fitgpt.xyz",
    image: {
      src: "/fitgpt.png",
      width: 1080,
      height: 567,
    },
  },
];

export default Projects;

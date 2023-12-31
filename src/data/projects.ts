import Project from "@/types/project";

const Projects: Project[] = [
  {
    name: "Croissant Chrome Extension",
    description:
      "The Croissant Chrome extension offers Guaranteed Buyback™ options for up to 1 year when you shop at your favorite brands and retailers for free.",
    url: "https://croissant.com/chrome-extension",
    image: {
      src: "/croissant-share.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "FitGPT",
    description: "FitGPT is an AI-powered personal trainer that generates custom workout and meal plans.",
    url: "https://fitgpt.xyz",
    image: {
      src: "/fitgpt.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "Supajournal",
    description: "Supajournal is a journaling app that uses AI to help you reflect on your day and improve your mental health.",
    url: "https://supajournal.app",
    image: {
      src: "/supajournal.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "TeamGPT",
    url: "https://teamgpt.app",
    description: "TeamGPT is a productivity app that uses AI to help you and your team co-author ChatGPT conversations.",
    image: {
      src: "/teamgpt.png",
      width: 1080,
      height: 567,
    },
  },
];

export default Projects;

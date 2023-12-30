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
    description: "Never worry about what workout to do again! Say goodbye to the days of scrolling through Instagram for workout inspiration.",

    url: "https://fitgpt.xyz",
    image: {
      src: "/fitgpt.png",
      width: 1080,
      height: 567,
    },
  },
  {
    name: "Supajournal",
    description:
      "Build that journaling habit once and for all. Supajournal is a journaling app powered by Supabase and OpenAI that helps you reflect, write, and grow.",
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
    description: "Collaborate with your team using ChatGPT. Supercharge your team's ChatGPT experience with TeamGPT.",
    image: {
      src: "/teamgpt.png",
      width: 1080,
      height: 567,
    },
  },
];

export default Projects;

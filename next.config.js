/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/*": ["./content/blog/**/*.md", "./public/resume.md"],
  },
};

module.exports = nextConfig;

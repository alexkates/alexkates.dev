import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next/types";
import "./globals.css";

export async function generateMetadata() {
  const title = "Hi, I'm Alex Kates 👋";
  const description =
    "I'm a product engineer currently working as Director of Engineering at https://croissant.com. I'm passionate about building great products and teams, especially from zero to one.";

  const images = "https://alexkates.dev/opengraph-image.png";
  const url = "https://alexkates.dev";
  const keywords = [
    "alex",
    "kates",
    "alex kates",
    "philadelphia",
    "software",
    "engineer",
    "engineering",
    "developer",
    "programming",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "node",
    "nodejs",
  ];

  const metadata: Metadata = {
    metadataBase: new URL("https://alexkates.dev"),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: title,
      images,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
      creator: "@thealexkates",
      site: "@thealexkates",
    },
  };

  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="container flex min-h-screen flex-col pt-2">
          <Providers>
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

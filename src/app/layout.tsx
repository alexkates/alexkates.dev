import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import Scripts from "@/components/scripts";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="en">
      <body className={inter.className}>
        <div className="container flex min-h-screen flex-col pt-2">
          <Providers>
            <Scripts />
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

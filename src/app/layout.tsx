import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Metadata, Viewport } from "next/types";
import "./globals.css";

export async function generateMetadata() {
  const title = "Hi, I'm Alex Kates 👋";
  const description =
    "Product engineer and founding engineer at Croissant with 15 years of experience building products for fintech and e-commerce startups.";

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <div className="container flex min-h-screen flex-col py-4 sm:py-6">
          <Providers>
            <Header />
            <div id="main-content" className="flex-grow" tabIndex={-1}>
              {children}
            </div>
            <Footer />
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

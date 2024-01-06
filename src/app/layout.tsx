import Footer from "@/components/footer";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { Scripts } from "@/components/scripts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Alex Kates",
    description:
      "Hi, I'm Alex Kates! Welcome to my little corner of the internet. I'm a software engineer currently working as Director of Engineering at https://croissant.com. I'm passionate about building great products and teams, especially from zero to one.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    keywords: [
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
    ],
    openGraph: {
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
  };
}

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className={cn("container pt-2 ", fontSans.variable)}>
          <Providers>
            <Scripts />
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}

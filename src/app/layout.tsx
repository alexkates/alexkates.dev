import Header from "@/components/header";
import Providers from "@/components/providers";
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
    description: "Build the thing.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
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
            <Header />
            <main>{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}

import Header from "@/components/header";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Alex Kates",
  description: "I talk about building things on the web.",
  metadataBase: new URL("https://alexkates.dev"),
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  );
}

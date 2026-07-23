import PageIntro from "@/components/page-intro";
import Link from "next/link";

export default function Hero() {
  return (
    <PageIntro eyebrow="Product engineer · Philadelphia" title="Hi, I’m Alex.">
      <p>
        I build products across web, mobile, and browser extensions. I&apos;m currently a founding engineer at{" "}
        <Link href="https://croissant.com?utm_source=alexkates.dev" target="_blank" className="underline">
          Croissant
        </Link>
        .
      </p>
    </PageIntro>
  );
}

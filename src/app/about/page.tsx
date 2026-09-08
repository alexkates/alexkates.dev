import PageIntro from "@/components/page-intro";
import PhotoStackCarousel from "@/components/photo-stack-carousel";
import profile from "@/data/profile";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = { title: "About | Alex Kates", alternates: { canonical: "/about" } };

export default function Page() {
  return (
    <main>
      <PageIntro eyebrow="A little about me" title="Builder. Outdoor person.">
        <p>I like making useful things and spending time outside.</p>
      </PageIntro>
      <section className="about-bio">
        <Image src="/headshot.png" alt="Alex Kates" width={320} height={320} priority className="about-portrait" />
        <div>
          <h2>I&apos;m Alex.</h2>
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>I like working close to the product, figuring out what matters, and seeing it through to the details.</p>
          <Link className="text-link" href="/resume">
            My experience ↗
          </Link>
        </div>
      </section>
      <section className="about-photos">
        <div className="section-top">
          <h2>A few places I&apos;ve been</h2>
          <span className="eyebrow">Out of office</span>
        </div>
        <PhotoStackCarousel />
      </section>
    </main>
  );
}

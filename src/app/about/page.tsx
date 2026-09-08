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
      <PageIntro title="About me" />
      <section className="about-bio">
        <Image src="/headshot.png" alt="Alex Kates" width={320} height={320} priority className="about-portrait" />
        <div>
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link className="text-link" href="/resume">
            Resume ↗
          </Link>
        </div>
      </section>
      <section className="about-photos">
        <div className="section-top">
          <h2>Travel photos</h2>
        </div>
        <PhotoStackCarousel />
      </section>
    </main>
  );
}

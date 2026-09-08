import PageIntro from "@/components/page-intro";
import profile from "@/data/profile";
import { Metadata } from "next/types";

export const metadata: Metadata = { title: "Contact | Alex Kates", alternates: { canonical: "/contact" } };
export default function Page() {
  return (
    <main>
      <PageIntro eyebrow="Contact" title="Say hello.">
        <p>Have a question, an idea, or something you&apos;re working on? Email me.</p>
      </PageIntro>
      <a className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email} ↗
      </a>
      <div className="contact-links">
        <a href={profile.links.github}>GitHub ↗</a>
        <a href={profile.links.linkedin}>LinkedIn ↗</a>
        <a href={profile.links.twitter}>X ↗</a>
      </div>
    </main>
  );
}

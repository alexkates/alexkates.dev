import profile from "@/data/profile";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./mode-toggle";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">Have something in mind?</p>
          <a className="footer-hello" href={`mailto:${profile.email}`}>
            Let&apos;s talk.
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="footer-socials">
          <a href={profile.links.github}>GitHub ↗</a>
          <a href={profile.links.linkedin}>LinkedIn ↗</a>
          <a href={profile.links.twitter}>X ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Alex Kates <span className="footer-location">· Philadelphia, PA</span>
        </span>
        <div>
          <Link href="/resume">Resume</Link>
          <Link href="/oss">Open source</Link>
          <Link href="/games">Games</Link>
          <Link href="/privacy">Privacy</Link>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}

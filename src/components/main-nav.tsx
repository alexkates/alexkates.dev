"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navLinks = [
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="site-nav">
      {navLinks.map(({ href, label }) => (
        <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

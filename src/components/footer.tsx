import Link from "next/link";
import React from "react";

function Footer() {
  const links = [
    { href: "https://nextjs.org", label: "Next.js" },
    { href: "https://ui.shadcn.com", label: "Shadcn/ui" },
    { href: "https://vercel.com", label: "Vercel" },
  ];

  return (
    <footer className="flex items-center justify-center my-4 text-muted-foreground text-sm">
      Powered by&nbsp;
      {links.map((link, index) => (
        <React.Fragment key={link.href}>
          <Link href={link.href} target="_blank" rel="noopener noreferrer" className="underline">
            {link.label}
          </Link>
          {index < links.length - 1 ? index === links.length - 2 ? <span>&nbsp;and&nbsp;</span> : <span>,&nbsp;</span> : null}
        </React.Fragment>
      ))}
      .
    </footer>
  );
}

export default Footer;

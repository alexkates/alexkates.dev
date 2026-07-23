import Link from "next/link";
import React from "react";

function Footer() {
  const links = [
    { href: "https://nextjs.org", label: "Next.js" },
    { href: "https://ui.shadcn.com", label: "shadcn/ui" },
    { href: "https://vercel.com", label: "Vercel" },
  ];

  return (
    <footer className="mt-16 flex flex-col items-center justify-center gap-1 border-t py-8 text-center text-xs leading-relaxed text-muted-foreground">
      <span>
        Powered by&nbsp;
        {links.map((link, index) => (
          <React.Fragment key={link.href}>
            <Link href={link.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
              {link.label}
            </Link>
            {index < links.length - 1 ? index === links.length - 2 ? <span>&nbsp;and&nbsp;</span> : <span>,&nbsp;</span> : null}
          </React.Fragment>
        ))}
        .
      </span>
      <span className="text-center">
        Built by&nbsp;
        <Link href="https://x.com/thealexkates" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
          Alex Kates
        </Link>
        . The source code is available on&nbsp;
        <Link
          href="https://github.com/alexkates/alexkates.dev"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          GitHub
        </Link>
        .
      </span>
    </footer>
  );
}

export default Footer;

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import ModeToggle from "./mode-toggle";

function Header() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-full border bg-muted/20 px-3 py-2 sm:px-4">
      <MainNav />
      <MobileNav />
      <div className="flex items-center gap-1">
        <Link
          href="https://github.com/alexkates"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="grid size-9 place-items-center rounded-full transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <GitHubLogoIcon />
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="mb-4 flex items-center justify-between">
      <HeaderNav />
      <div className="flex items-center gap-4">
        <Link href="https://github.com/alexkates" target="_blank">
          <GitHubLogoIcon />
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;

import { UserButton } from "@clerk/nextjs";
import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="mb-4 flex items-center justify-between">
      <HeaderNav />
      <div>
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
}

export default Header;

import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="mb-0 flex items-center justify-between sm:mb-8">
      <HeaderNav />
      <ModeToggle />
    </header>
  );
}

export default Header;

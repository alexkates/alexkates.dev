import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="flex justify-between items-center mb-0 sm:mb-8">
      <HeaderNav />
      <ModeToggle />
    </header>
  );
}

export default Header;

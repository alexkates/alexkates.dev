import { HeaderNav } from "./header-nav";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="flex justify-between items-center">
      <HeaderNav />
      <ModeToggle />
    </header>
  );
}

export default Header;

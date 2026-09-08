import Link from "next/link";
import MainNav from "./main-nav";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Alex Kates home">
        <span className="monogram" aria-hidden="true">
          ak<span>.</span>
        </span>
        <span>Alex Kates</span>
      </Link>
      <MainNav />
    </header>
  );
}

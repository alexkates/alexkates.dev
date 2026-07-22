import Link from "next/link";

type Props = {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
};

export default function SocialListItem({ children, external = false, href, label }: Props) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        {children}
        <span>{label}</span>
      </Link>
    </li>
  );
}

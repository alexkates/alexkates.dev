import { cn } from "@/lib/utils";

export default function PageIntro({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("page-intro", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children ? <div className="page-description">{children}</div> : null}
    </section>
  );
}

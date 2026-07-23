import { cn, fadeIn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export default function PageIntro({ eyebrow, title, children, className }: Props) {
  return (
    <section className={cn(fadeIn, "animation-delay-200 flex flex-col gap-4 rounded-[2rem] border bg-muted/20 p-6 sm:p-8", className)}>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
        <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      </div>
      {children ? <div className="max-w-2xl text-pretty leading-7 text-muted-foreground">{children}</div> : null}
    </section>
  );
}

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      <h2 className="text-balance text-2xl font-semibold tracking-tight">{title}</h2>
      {description ? <p className="max-w-2xl text-pretty text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

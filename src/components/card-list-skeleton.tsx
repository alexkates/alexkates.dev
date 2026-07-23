import { Skeleton } from "./ui/skeleton";

function CardListSkeleton() {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Loading projects">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex flex-col gap-3 rounded-2xl border bg-muted/20 p-4">
          <Skeleton className="aspect-[1.9/1] w-full rounded-xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CardListSkeleton;

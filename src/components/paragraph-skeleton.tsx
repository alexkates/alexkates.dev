import { Skeleton } from "./ui/skeleton";

function ParagraphSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-2xl border bg-muted/20 p-5" aria-label="Loading content">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export default ParagraphSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full-page glassmorphism skeleton shown while route chunks lazy-load.
 */
const PageSkeleton = () => (
  <div className="min-h-screen pt-28 pb-16" dir="rtl">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex justify-center mb-6">
        <Skeleton className="w-20 h-20 rounded-3xl bg-primary/10" />
      </div>
      <Skeleton className="h-14 w-2/3 mx-auto rounded-2xl bg-primary/10 mb-4" />
      <Skeleton className="h-6 w-1/2 mx-auto rounded-xl bg-primary/10 mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl bg-primary/5" />
        ))}
      </div>
    </div>
  </div>
);

export default PageSkeleton;
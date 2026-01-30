function SkeletonBox({ className }) {
  return <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />;
}

export function SkeletonExperience() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white rounded-xl border p-6 space-y-3">
        <SkeletonBox className="h-7 w-48" />
        <SkeletonBox className="h-4 w-64" />
        <div className="flex gap-3 mt-4">
          <SkeletonBox className="h-6 w-24" />
          <SkeletonBox className="h-6 w-28" />
        </div>
      </div>

      {/* Questions Skeleton */}
      <div className="bg-white rounded-xl border p-6 space-y-3">
        <SkeletonBox className="h-5 w-52" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-11/12" />
        <SkeletonBox className="h-4 w-10/12" />
      </div>

      {/* Tips Skeleton */}
      <div className="bg-white rounded-xl border p-6 space-y-3">
        <SkeletonBox className="h-5 w-40" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-9/12" />
      </div>
    </div>
  );
}

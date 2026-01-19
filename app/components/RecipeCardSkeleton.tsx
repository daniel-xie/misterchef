export function RecipeCardSkeleton() {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded-[15px] overflow-hidden"
      style={{ height: "384px", width: "320px" }}
    >
      <div className="h-full w-full bg-gradient-to-t from-gray-300 to-gray-200 flex flex-col justify-end p-6">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="flex gap-3">
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

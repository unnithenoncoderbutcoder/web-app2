export function TournamentSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
          <div className="mb-4 space-y-2">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-4 w-2/3 rounded bg-gray-200" />
            ))}
          </div>
          <div className="h-10 w-full rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
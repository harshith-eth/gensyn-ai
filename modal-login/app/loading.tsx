export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 justify-center text-center">
      <div className="card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
} 
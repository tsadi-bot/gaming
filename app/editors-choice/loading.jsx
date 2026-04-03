// app/editors-choice/loading.jsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-pulse">
      {/* Skeleton Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto h-12 w-12 bg-white/5 rounded-full mb-4" />
        <div className="mx-auto h-10 w-64 bg-white/5 rounded-lg mb-4" />
        <div className="mx-auto h-6 w-96 bg-white/5 rounded-lg" />
      </div>

      {/* Skeleton Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between mb-12">
          <div className="h-8 w-48 bg-white/5 rounded-lg" />
          <div className="h-10 w-40 bg-white/5 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 h-[380px]">
              <div className="aspect-[16/9] bg-white/10" />
              <div className="p-5 space-y-4">
                <div className="flex justify-between">
                  <div className="h-6 w-32 bg-white/10 rounded" />
                  <div className="h-6 w-10 bg-white/10 rounded" />
                </div>
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-2/3 bg-white/5 rounded" />
                <div className="h-10 w-full bg-white/10 rounded-lg mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

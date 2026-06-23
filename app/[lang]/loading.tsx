export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2563EB]/20 border-t-[#2563EB] rounded-full animate-spin" />
        <p className="text-[#4B4B4B] text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

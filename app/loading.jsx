export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#6D5DFB]">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-white/25 border-t-white" />
        </div>

        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
            FIT<span className="text-[#6D5DFB]">LOG</span>
          </p>

          <p className="mt-2 text-xs font-medium text-[#6B6B80]">
            Loading workouts…
          </p>
        </div>
      </div>
    </main>
  );
}
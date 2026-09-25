export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ccff00]">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-zinc-950/20 border-t-zinc-950" />
        </div>

        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </p>

          <p className="mt-2 text-xs font-medium text-zinc-500">
            Loading workouts…
          </p>
        </div>
      </div>
    </main>
  );
}
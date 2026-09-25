export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b0d]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-800 border-t-[#ccff00]" />
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-zinc-400">
          Loading workouts…
        </p>
      </div>
    </main>
  );
}

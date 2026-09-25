import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b0d] px-6 text-white">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ccff00] text-black">
          <Dumbbell size={28} />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ccff00]">
          FitLog
        </p>
        <h1 className="display-font mt-3 text-7xl font-bold tracking-tight">404</h1>
        <p className="mt-3 text-zinc-400">This workout route does not exist.</p>
        <Link
          href="/"
          className="focus-ring mt-7 inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-[#b7e600]"
        >
          <ArrowLeft size={16} />
          Back to workouts
        </Link>
      </div>
    </main>
  );
}

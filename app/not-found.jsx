import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#ccff00] text-zinc-950 shadow-[0_0_40px_rgba(204,255,0,0.12)]">
          <Dumbbell size={36} strokeWidth={2.2} />
        </div>

        {/* 404 */}
        <p className="mt-8 text-7xl font-black tracking-tighter text-[#ccff00] sm:text-8xl">
          404
        </p>

        <p className="mt-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
          PAGE NOT FOUND
        </p>

        <h1 className="mt-4 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
          This workout went missing.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500">
          The page you&apos;re looking for doesn&apos;t exist or the workout
          may have been removed.
        </p>

        {/* Back Home */}
        <Link
          href="/"
          className="btn-accent mt-8 inline-flex"
        >
          <ArrowLeft size={17} />
          Back to workouts
        </Link>
      </div>
    </main>
  );
}
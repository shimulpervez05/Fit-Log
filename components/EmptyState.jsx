"use client";

import Link from "next/link";
import { ArrowRight, Dumbbell, Heart } from "lucide-react";

export default function EmptyState({ mode = "plan" }) {
  const isPlan = mode === "plan";

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900 text-[#ccff00]">
        {isPlan ? <Dumbbell size={24} /> : <Heart size={24} />}
      </div>

      <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#ccff00]">
        NOTHING HERE YET
      </p>

      <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-white">
        {isPlan ? "Your plan is empty" : "No saved workouts"}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
        {isPlan
          ? "Browse the library and add a lift to get today moving."
          : "Save workouts from the library and come back to them whenever you're ready."}
      </p>

      <Link
        href="/"
        className="btn-accent mt-7 group"
      >
        Go to workouts

        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
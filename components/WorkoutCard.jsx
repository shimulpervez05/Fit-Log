"use client";

import Link from "next/link";
import { Clock3, Flame, Star, Dumbbell, ArrowUpRight } from "lucide-react";

const LOCAL_WORKOUT_IMAGES = {
  "1": "/images/workouts/bench.svg",
  "2": "/images/workouts/squat.svg",
  "3": "/images/workouts/deadlift.svg",
  "4": "/images/workouts/pullup.svg",
  "5": "/images/workouts/reference-overhead.webp",
  "6": "/images/workouts/row.svg",
  "7": "/images/workouts/rdl.svg",
  "8": "/images/workouts/lunge.svg",
  "9": "/images/workouts/reference-curl.webp",
  "10": "/images/workouts/pushdown.svg",
  "11": "/images/workouts/lateral.svg",
  "12": "/images/workouts/reference-plank.webp",
};

const FALLBACK_IMAGE = "/images/workouts/bench.svg";

export default function WorkoutCard({ workout }) {
  const id = String(workout?.id ?? workout?._id ?? "");
  const image = LOCAL_WORKOUT_IMAGES[id] || workout?.image || workout?.imageUrl || FALLBACK_IMAGE;
  const tags = workout?.muscleGroups ?? workout?.categories ?? workout?.category ?? [];
  const categories = Array.isArray(tags) ? tags : [tags].filter(Boolean);
  const duration = workout?.duration ?? workout?.durationMinutes ?? 0;
  const calories = workout?.caloriesBurned ?? workout?.calories ?? 0;
  const rating = workout?.rating ?? 0;

  return (
    <Link
      href={`/workout/${id}`}
      className="group focus-ring card-fit block overflow-hidden transition hover:-translate-y-1 hover:border-zinc-600"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        <img
          src={image}
          alt={workout?.name || "Workout"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-black text-white">
          <Star size={12} className="fill-[#ccff00] text-[#ccff00]" />
          {rating}
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {categories.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ccff00]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="display-font text-xl font-bold uppercase leading-tight text-white">
            {workout?.name || workout?.title}
          </h3>
          <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-zinc-600 transition group-hover:text-[#ccff00]" />
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <Dumbbell size={14} />
          {workout?.equipment || "Bodyweight"}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-4 text-xs font-bold text-zinc-400">
          <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{duration} min</span>
          <span className="inline-flex items-center gap-1.5"><Flame size={14} />{calories} kcal</span>
          <span className="inline-flex items-center gap-1.5"><Star size={14} />{rating}</span>
        </div>
      </div>
    </Link>
  );
}

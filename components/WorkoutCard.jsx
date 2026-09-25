"use client";

import Link from "next/link";
import { Clock3, Flame, Star, Dumbbell, ArrowUpRight } from "lucide-react";

export default function WorkoutCard({ workout }) {
  if (!workout) return null;

  const {
    id,
    name,
    title,
    image,
    imageUrl,
    category,
    categories,
    equipment,
    duration,
    durationMinutes,
    calories,
    caloriesBurned,
    rating,
  } = workout;

  const workoutName = name || title || "Untitled Workout";

  const workoutImage =
    image ||
    imageUrl ||
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80";

  const workoutCategories = Array.isArray(categories)
    ? categories
    : category
      ? Array.isArray(category)
        ? category
        : [category]
      : [];

  const workoutDuration = duration || durationMinutes || 0;
  const workoutCalories = calories || caloriesBurned || 0;

  return (
    <Link
      href={`/workout/${id}`}
      className="workout-card group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/30"
    >
      {/* Image */}
      <div className="workout-image">
        <img
          src={workoutImage}
          alt={workoutName}
          loading="lazy"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

        {/* Open Icon */}
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition duration-300 group-hover:bg-[#ccff00] group-hover:text-zinc-950">
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Categories */}
        {workoutCategories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {workoutCategories.slice(0, 3).map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="tag"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="line-clamp-2 min-h-[52px] text-lg font-black uppercase leading-tight tracking-tight text-white transition group-hover:text-[#ccff00]">
          {workoutName}
        </h3>

        {/* Equipment */}
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
          <Dumbbell size={14} />

          <span>
            {equipment || "No equipment specified"}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 border-t border-zinc-800 pt-4">
          {/* Duration */}
          <div className="flex items-center gap-2 border-r border-zinc-800">
            <Clock3 size={14} className="text-zinc-500" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                Time
              </p>

              <p className="mt-0.5 text-xs font-bold text-zinc-300">
                {workoutDuration} min
              </p>
            </div>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2 border-r border-zinc-800 px-3">
            <Flame size={14} className="text-zinc-500" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                Calories
              </p>

              <p className="mt-0.5 text-xs font-bold text-zinc-300">
                {workoutCalories}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-end gap-2 pl-3">
            <Star
              size={14}
              className="fill-[#ccff00] text-[#ccff00]"
            />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                Rating
              </p>

              <p className="mt-0.5 text-xs font-bold text-zinc-300">
                {rating || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
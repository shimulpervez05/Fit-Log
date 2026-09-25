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
    muscleGroups,
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
    : Array.isArray(muscleGroups)
      ? muscleGroups
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
      className="workout-card group block overflow-hidden rounded-2xl border border-[#E7E5F2] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#D8D5EC] hover:shadow-2xl hover:shadow-black/30"
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
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition duration-300 group-hover:bg-[#6D5DFB] group-hover:text-white">
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
        <h3 className="line-clamp-2 min-h-[52px] text-lg font-black uppercase leading-tight tracking-tight text-white transition group-hover:text-[#6D5DFB]">
          {workoutName}
        </h3>

        {/* Equipment */}
        <div className="mt-3 flex items-center gap-2 text-xs text-[#6B6B80]">
          <Dumbbell size={14} />

          <span>
            {equipment || "No equipment specified"}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 border-t border-[#E7E5F2] pt-4">
          {/* Duration */}
          <div className="flex items-center gap-2 border-r border-[#E7E5F2]">
            <Clock3 size={14} className="text-[#6B6B80]" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#6B6B80]">
                Time
              </p>

              <p className="mt-0.5 text-xs font-bold text-[#17172B]">
                {workoutDuration} min
              </p>
            </div>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2 border-r border-[#E7E5F2] px-3">
            <Flame size={14} className="text-[#6B6B80]" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#6B6B80]">
                Calories
              </p>

              <p className="mt-0.5 text-xs font-bold text-[#17172B]">
                {workoutCalories}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-end gap-2 pl-3">
            <Star
              size={14}
              className="fill-[#6D5DFB] text-[#6D5DFB]"
            />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#6B6B80]">
                Rating
              </p>

              <p className="mt-0.5 text-xs font-bold text-[#17172B]">
                {rating || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
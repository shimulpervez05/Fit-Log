"use client";

import Link from "next/link";
import {
  Check,
  Clock3,
  Flame,
  Star,
  Trash2,
  ArrowRight,
  Dumbbell,
} from "lucide-react";

import { useFitLog } from "@/context/FitLogContext";

export default function PlanCard({
  workout,
  mode = "plan",
}) {
  const {
    toggleComplete,
    removeFromPlan,
    removeSaved,
  } = useFitLog();

  if (!workout) return null;

  const {
    id,
    name,
    title,
    image,
    imageUrl,
    equipment,
    duration,
    durationMinutes,
    calories,
    caloriesBurned,
    rating,
    completed,
  } = workout;

  const workoutName = name || title || "Untitled Workout";

  const workoutImage =
    image ||
    imageUrl ||
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80";

  const workoutDuration = duration || durationMinutes || 0;
  const workoutCalories = calories || caloriesBurned || 0;

  const isPlan = mode === "plan";

  const handleRemove = () => {
    if (isPlan) {
      removeFromPlan(id);
    } else {
      removeSaved(id);
    }
  };

  const handleToggleDone = () => {
    toggleComplete(id);
  };

  return (
    <article
      className={`group overflow-hidden rounded-xl border bg-zinc-950 transition ${
        completed
          ? "border-[#ccff00]/30"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-48">
          <img
            src={workoutImage}
            alt={workoutName}
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
              completed ? "opacity-50" : ""
            }`}
          />

          {completed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ccff00] text-zinc-950">
                <Check size={22} strokeWidth={3} />
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#ccff00]">
                {completed ? "Completed" : isPlan ? "Today's Plan" : "Saved"}
              </p>

              <h3
                className={`text-xl font-black uppercase leading-tight tracking-tight ${
                  completed
                    ? "text-zinc-500 line-through"
                    : "text-white"
                }`}
              >
                {workoutName}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                <Dumbbell size={13} />
                <span>{equipment || "No equipment specified"}</span>
              </div>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={handleRemove}
              aria-label={`Remove ${workoutName}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-4">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock3 size={14} />
              <span>{workoutDuration} min</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Flame size={14} />
              <span>{workoutCalories} kcal</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Star
                size={14}
                className="fill-[#ccff00] text-[#ccff00]"
              />
              <span>{rating || "N/A"}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={`/workout/${id}`}
              className="btn-outline min-h-10 px-4 text-xs"
            >
              View Details
              <ArrowRight size={14} />
            </Link>

            {isPlan && (
              <button
                type="button"
                onClick={handleToggleDone}
                className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-xs font-bold transition ${
                  completed
                    ? "bg-zinc-800 text-zinc-400"
                    : "bg-[#ccff00] text-zinc-950 hover:bg-[#d8ff33]"
                }`}
              >
                <Check size={15} />

                {completed ? "Completed" : "Mark as Done"}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
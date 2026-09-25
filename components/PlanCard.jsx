"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Flame, Star, X } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export default function PlanCard({ workout, mode = "plan" }) {
  const { toggleComplete, removeFromPlan, removeSaved } = useFitLog();
  const [toast, setToast] = useState("");
  const completed = Boolean(workout.completed);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function handleDone() {
    toggleComplete(workout.id);
    notify(completed ? "Marked as active" : "Workout marked as done");
  }

  function handleRemove() {
    if (mode === "plan") {
      removeFromPlan(workout.id);
      notify("Removed from today's plan");
    } else {
      removeSaved(workout.id);
      notify("Removed from saved");
    }
  }

  return (
    <article className={`relative overflow-hidden rounded-xl border bg-[#111518] p-4 sm:p-5 ${completed ? "border-[#ccff00]/40" : "border-zinc-800"}`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="h-28 w-full shrink-0 overflow-hidden rounded-lg bg-zinc-900 sm:w-36">
          <img
            src={workout.image || workout.imageUrl}
            alt={workout.name || "Workout"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            {(workout.muscleGroups || []).map((tag) => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-wider text-[#ccff00]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h3 className={`display-font text-2xl font-bold uppercase text-white ${completed ? "line-through opacity-60" : ""}`}>
              {workout.name || workout.title}
            </h3>
            {completed && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-black uppercase text-black">
                <Check size={12} /> Done
              </span>
            )}
          </div>

          <p className="mt-2 text-xs font-semibold text-zinc-500">{workout.equipment || "Bodyweight"}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-zinc-400">
            <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{workout.duration} min</span>
            <span className="inline-flex items-center gap-1.5"><Flame size={14} />{workout.caloriesBurned ?? workout.calories} kcal</span>
            <span className="inline-flex items-center gap-1.5"><Star size={14} />{workout.rating}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Link
            href={`/workout/${workout.id}`}
            className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3.5 py-2.5 text-[11px] font-black uppercase text-white hover:border-zinc-500"
          >
            View Details <ArrowRight size={14} />
          </Link>

          {mode === "plan" && (
            <button
              type="button"
              onClick={handleDone}
              className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-[#ccff00] px-3.5 py-2.5 text-[11px] font-black uppercase text-black hover:bg-[#b7e600]"
            >
              <Check size={14} />
              {completed ? "Done" : "Mark as Done"}
            </button>
          )}

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove workout"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 hover:border-red-800 hover:text-red-400"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {toast && (
        <div className="toast-stack" aria-live="polite">
          <div className="toast-item">{toast}</div>
        </div>
      )}
    </article>
  );
}

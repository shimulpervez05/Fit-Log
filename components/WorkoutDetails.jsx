"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Check, Clock3, Dumbbell, Flame, Plus, Star } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

function Spec({ label, value }) {
  return (
    <div className="border-b border-zinc-800 py-3 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">{label}</span>
        <span className="text-sm font-bold text-white">{value || "—"}</span>
      </div>
    </div>
  );
}

export default function WorkoutDetails({ workout }) {
  const { addToPlan, saveWorkout, isInPlan, isSaved, plan } = useFitLog();
  const [toast, setToast] = useState("");
  const [toastKey, setToastKey] = useState(0);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toastKey, toast]);

  const id = workout?.id ?? workout?._id;
  const image = workout?.image || workout?.imageUrl;
  const categories = Array.isArray(workout?.muscleGroups)
    ? workout.muscleGroups
    : Array.isArray(workout?.categories)
      ? workout.categories
      : [workout?.category].filter(Boolean);
  const instructions = Array.isArray(workout?.instructions)
    ? workout.instructions.slice(0, 4)
    : [];

  const inPlan = isInPlan(id);
  const saved = isSaved(id);
  const full = plan.length >= 5 && !inPlan;

  const specs = useMemo(
    () => [
      ["Equipment", workout?.equipment],
      ["Difficulty", workout?.difficulty],
      ["Sets", workout?.sets],
      ["Reps", workout?.reps],
      ["Duration", workout?.duration ? `${workout.duration} min` : ""],
      ["Calories", workout?.caloriesBurned ? `${workout.caloriesBurned} kcal` : ""],
      ["Rating", workout?.rating],
    ],
    [workout]
  );

  function showToast(message) {
    setToast(message);
    setToastKey((value) => value + 1);
  }

  function handleAdd() {
    const result = addToPlan(workout);
    showToast(result.message);
  }

  function handleSave() {
    const result = saveWorkout(workout);
    showToast(result.message);
  }

  return (
    <main className="container-fit section-fit">
      <Link href="/" className="focus-ring mb-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white">
        <ArrowLeft size={15} />
        Back to library
      </Link>

      <div className="grid overflow-hidden rounded-2xl border border-zinc-800 bg-[#111518] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[420px] bg-zinc-950 lg:min-h-[680px]">
          <img src={image} alt={workout?.name || "Workout"} className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#ccff00]">
                {category}
              </span>
            ))}
          </div>

          <h1 className="display-font mt-5 text-5xl font-bold uppercase leading-none text-white sm:text-6xl">
            {workout?.name || workout?.title}
          </h1>

          <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-base">
            {workout?.description}
          </p>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-[#0d1113] px-5">
            {specs.map(([label, value]) => (
              <Spec key={label} label={label} value={value} />
            ))}
          </div>

          <div className="mt-9">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#ccff00]" />
              <h2 className="text-xs font-black uppercase tracking-[0.18em] text-white">Instructions</h2>
            </div>

            <ol className="mt-5 space-y-4">
              {instructions.map((step, index) => (
                <li key={index} className="flex gap-4 text-sm leading-6 text-zinc-400">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-xs font-black text-[#ccff00]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAdd}
              disabled={inPlan || full}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-4 py-3.5 text-xs font-black uppercase text-black transition hover:bg-[#b7e600] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {inPlan ? <Check size={16} /> : <Plus size={16} />}
              {inPlan ? "In today's plan" : full ? "Plan is full" : "Add to today's plan"}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saved}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-4 py-3.5 text-xs font-black uppercase text-white transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saved ? <Check size={16} /> : <Bookmark size={16} />}
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast-stack" aria-live="polite">
          <div className="toast-item">{toast}</div>
        </div>
      )}
    </main>
  );
}

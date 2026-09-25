"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  Heart,
  ListChecks,
  Star,
  Target,
  X,
} from "lucide-react";

import { useFitLog } from "@/context/FitLogContext";

export default function WorkoutDetails({ workout }) {
  const {
    plan,
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (!workout) {
    return null;
  }

  const {
    id,
    _id,
    name,
    title,
    image,
    imageUrl,
    description,
    category,
    categories,
    muscleGroups,
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    durationMinutes,
    calories,
    caloriesBurned,
    rating,
    instructions,
    steps,
  } = workout;

  const workoutId = id ?? _id;

  const workoutName = name || title || "Untitled Workout";

  const workoutImage =
    image ||
    imageUrl ||
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85";

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

  const workoutInstructions = Array.isArray(instructions)
    ? instructions
    : Array.isArray(steps)
      ? steps
      : [];

  const showToast = (message, type = "success") => {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  };

  const handleAddToPlan = () => {
    const result = addToPlan(workout);

    showToast(
      result.message,
      result.success ? "success" : "error"
    );
  };

  const handleSave = () => {
    const result = saveWorkout(workout);

    showToast(
      result.message,
      result.success ? "success" : "error"
    );
  };

  const alreadyInPlan = isInPlan(workoutId);
  const alreadySaved = isSaved(workoutId);
  const planIsFull = plan.length >= 5;

  return (
    <>
      <main className="section">
        <div className="container">
          {/* Back */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6B6B80] transition hover:text-[#6D5DFB]"
          >
            <ArrowLeft size={16} />
            Back to workout library
          </Link>

          {/* Main Details */}
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl border border-[#E7E5F2] bg-[#F8F7FF]">
              <div className="aspect-[4/3]">
                <img
                  src={workoutImage}
                  alt={workoutName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              {/* Categories */}
              {workoutCategories.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {workoutCategories.map((item, index) => (
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
              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                {workoutName}
              </h1>

              {/* Description */}
              <p className="mt-6 text-base leading-7 text-[#55556B]">
                {description ||
                  "A focused workout designed to help you train with intent and build consistent strength."}
              </p>

              {/* Specs */}
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#E7E5F2] bg-[#F0EEFF] sm:grid-cols-3">
                <Spec
                  icon={<Dumbbell size={16} />}
                  label="Equipment"
                  value={equipment || "N/A"}
                />

                <Spec
                  icon={<Target size={16} />}
                  label="Difficulty"
                  value={difficulty || "N/A"}
                />

                <Spec
                  icon={<ListChecks size={16} />}
                  label="Sets"
                  value={sets || "N/A"}
                />

                <Spec
                  icon={<Dumbbell size={16} />}
                  label="Reps"
                  value={reps || "N/A"}
                />

                <Spec
                  icon={<Clock3 size={16} />}
                  label="Duration"
                  value={`${workoutDuration} min`}
                />

                <Spec
                  icon={<Flame size={16} />}
                  label="Calories"
                  value={workoutCalories}
                />
              </div>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star
                    size={17}
                    className="fill-[#6D5DFB] text-[#6D5DFB]"
                  />

                  <span className="text-sm font-black text-white">
                    {rating || "N/A"}
                  </span>
                </div>

                <span className="text-xs text-[#6B6B80]">
                  Workout rating
                </span>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToPlan}
                  disabled={alreadyInPlan || planIsFull}
                  className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg px-5 text-sm font-black transition ${
                    alreadyInPlan
                      ? "cursor-not-allowed bg-[#F0EEFF] text-[#6B6B80]"
                      : planIsFull
                        ? "cursor-not-allowed bg-[#F0EEFF] text-[#6B6B80]"
                        : "bg-[#6D5DFB] text-white hover:bg-[#5548D9]"
                  }`}
                >
                  <Check size={17} />

                  {alreadyInPlan
                    ? "Already in today's plan"
                    : planIsFull
                      ? "Today's plan is full"
                      : "Add to today's plan"}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={alreadySaved}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-bold transition ${
                    alreadySaved
                      ? "cursor-not-allowed border-[#E7E5F2] text-[#6B6B80]"
                      : "border-[#D8D5EC] text-[#17172B] hover:border-[#6D5DFB] hover:text-[#6D5DFB]"
                  }`}
                >
                  <Heart
                    size={17}
                    className={alreadySaved ? "fill-current" : ""}
                  />

                  {alreadySaved ? "Saved" : "Save for later"}
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <section className="mt-16 border-t border-[#E7E5F2] pt-12">
            <div className="mb-8">
              <p className="section-eyebrow">
                HOW TO PERFORM
              </p>

              <h2 className="section-title">
                FOLLOW THE STEPS
              </h2>
            </div>

            {workoutInstructions.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {workoutInstructions
                  .slice(0, 4)
                  .map((instruction, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-[#E7E5F2] bg-white p-6"
                    >
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#6D5DFB] text-sm font-black text-white">
                        {index + 1}
                      </div>

                      <p className="text-sm leading-7 text-[#55556B]">
                        {typeof instruction === "string"
                          ? instruction
                          : instruction?.step ||
                            instruction?.description ||
                            instruction?.text ||
                            "Follow the movement with controlled form."}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="rounded-xl border border-[#E7E5F2] bg-white p-6">
                <p className="text-sm leading-7 text-[#6B6B80]">
                  Follow controlled movement throughout every repetition.
                  Keep your form consistent and focus on the target muscle
                  group.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <div
            className={`toast flex items-center gap-3 ${
              toast.type === "error"
                ? "border-red-500/30"
                : "border-[#6D5DFB]/20"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                toast.type === "error"
                  ? "bg-red-500/10 text-red-400"
                  : "bg-[#6D5DFB]/10 text-[#6D5DFB]"
              }`}
            >
              {toast.type === "error" ? (
                <X size={14} />
              ) : (
                <Check size={14} />
              )}
            </span>

            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-2 text-[#6B6B80]">
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-[#17172B]">
        {value}
      </p>
    </div>
  );
}
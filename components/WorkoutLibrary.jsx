"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkouts();

        if (!isMounted) return;

        /*
         * The API may return either:
         * - an array directly
         * - { data: [...] }
         * - { workouts: [...] }
         */
        const workoutList = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.workouts)
              ? data.workouts
              : [];

        setWorkouts(workoutList);
      } catch (err) {
        console.error("Workout library error:", err);

        if (isMounted) {
          setError(
            "We couldn't load the workout library. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedWorkouts = useMemo(() => {
    const list = [...workouts];

    list.sort((a, b) => {
      if (sortBy === "calories") {
        return (
          Number(b.calories || b.caloriesBurned || 0) -
          Number(a.calories || a.caloriesBurned || 0)
        );
      }

      if (sortBy === "rating") {
        return (
          Number(b.rating || 0) -
          Number(a.rating || 0)
        );
      }

      return (
        Number(a.duration || a.durationMinutes || 0) -
        Number(b.duration || b.durationMinutes || 0)
      );
    });

    return list;
  }, [workouts, sortBy]);

  return (
    <section id="library" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow">
              WORKOUT LIBRARY
            </p>

            <h2 className="section-title">
              THE LIBRARY
            </h2>

            <p className="section-subtitle">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort */}
          {!loading && !error && workouts.length > 0 && (
            <div className="flex items-center justify-between gap-3 md:justify-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Sort by
              </span>

              <SortDropdown
                value={sortBy}
                onChange={setSortBy}
              />
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="flex flex-col items-center gap-4">
              <div className="loading-spinner" />

              <p className="text-sm font-semibold text-zinc-500">
                Loading workouts…
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.03] px-6 text-center">
            <p className="text-sm font-bold text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-outline mt-5"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          workouts.length === 0 && (
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 px-6 text-center">
              <div>
                <p className="text-lg font-black uppercase text-white">
                  No workouts found
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  The workout library is currently empty.
                </p>
              </div>
            </div>
          )}

        {/* Workout Grid */}
        {!loading &&
          !error &&
          sortedWorkouts.length > 0 && (
            <div className="workout-grid">
              {sortedWorkouts.map((workout, index) => (
                <WorkoutCard
                  key={
                    workout.id ??
                    workout._id ??
                    `${workout.name || workout.title}-${index}`
                  }
                  workout={{
                    ...workout,
                    id: workout.id ?? workout._id,
                  }}
                />
              ))}
            </div>
          )}
      </div>
    </section>
  );
}
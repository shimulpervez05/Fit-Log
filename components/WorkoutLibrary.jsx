"use client";

import { useEffect, useMemo, useState } from "react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadWorkouts() {
    try {
      setLoading(true);
      setError("");
      const response = await getWorkouts();
      const data = Array.isArray(response)
        ? response
        : response?.data ?? response?.workouts ?? [];
      setWorkouts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Could not load workouts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const list = [...workouts];
    if (sortBy === "calories") {
      return list.sort((a, b) => Number(b.caloriesBurned ?? b.calories ?? 0) - Number(a.caloriesBurned ?? a.calories ?? 0));
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
    }
    return list.sort((a, b) => Number(a.duration ?? 0) - Number(b.duration ?? 0));
  }, [workouts, sortBy]);

  return (
    <section id="library" className="container-fit section-fit scroll-mt-20">
      <div className="flex flex-col justify-between gap-6 border-b border-zinc-800 pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">THE LIBRARY</p>
          <h2 className="display-font mt-4 text-4xl font-bold uppercase text-white sm:text-5xl">
            Twelve lifts covering every major muscle group.
          </h2>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {loading && (
        <div className="flex min-h-64 items-center justify-center">
          <div className="flex items-center gap-3 text-sm font-bold text-zinc-400">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-[#ccff00]" />
            Loading workouts…
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="mt-8 rounded-xl border border-red-900/60 bg-red-950/20 p-6 text-sm text-red-300">
          <p>{error}</p>
          <button onClick={loadWorkouts} className="mt-4 rounded-lg bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && sortedWorkouts.length === 0 && (
        <p className="py-20 text-center text-zinc-500">No workouts found.</p>
      )}

      {!loading && !error && sortedWorkouts.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id ?? workout._id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}

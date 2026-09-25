"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import WorkoutDetails from "@/components/WorkoutDetails";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutPage() {
  const params = useParams();
  const id = params?.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadWorkout() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();

        const workoutData = data?.data || data?.workout || data;

        if (!workoutData || typeof workoutData !== "object") {
          throw new Error("Invalid workout data");
        }

        setWorkout(workoutData);
      } catch (err) {
        console.error("Failed to load workout:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-zinc-950">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-[#ccff00]" />
            <p className="mt-4 text-sm text-zinc-500">
              Loading workout…
            </p>
          </div>
        </main>
      </>
    );
  }

  if (error || !workout) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-zinc-950 px-6">
          <div className="text-center">
            <h1 className="text-3xl font-black text-white">
              WORKOUT NOT FOUND
            </h1>

            <p className="mt-3 text-zinc-500">
              We couldn't load this workout.
            </p>

            <a
              href="/"
              className="mt-6 inline-flex rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-black text-zinc-950"
            >
              BACK TO WORKOUTS
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <WorkoutDetails workout={workout} />
    </>
  );
}
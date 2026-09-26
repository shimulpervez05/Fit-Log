import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WorkoutDetails from "@/components/WorkoutDetails";
import { getFallbackWorkout } from "@/lib/fallback-workouts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function loadWorkout(id) {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      return data?.data || data?.workout || data;
    }
  } catch (error) {
    console.error("Upstream workout detail unavailable:", error);
  }

  return getFallbackWorkout(id);
}

export default async function WorkoutPage({ params }) {
  const { id } = await params;
  if (!id) notFound();

  const workout = await loadWorkout(id);
  if (!workout || typeof workout !== "object") notFound();

  return (
    <>
      <Navbar />
      <WorkoutDetails workout={workout} />
    </>
  );
}

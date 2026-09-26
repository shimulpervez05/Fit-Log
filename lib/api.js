import { fallbackWorkouts, getFallbackWorkout } from "@/lib/fallback-workouts";

const API_URL = "/api/workouts";

export async function getWorkouts() {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Workout API returned ${response.status}`);

    const data = await response.json();
    const workouts = Array.isArray(data)
      ? data
      : data?.data ?? data?.workouts ?? [];

    if (Array.isArray(workouts) && workouts.length > 0) return workouts;
    return fallbackWorkouts;
  } catch (error) {
    console.error("Workout list unavailable; using local fallback data:", error);
    return fallbackWorkouts;
  }
}

export async function getWorkoutById(id) {
  if (!id) throw new Error("Workout id is required");

  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Workout API returned ${response.status}`);
    return response.json();
  } catch (error) {
    const fallback = getFallbackWorkout(id);
    if (fallback) return fallback;
    throw error;
  }
}

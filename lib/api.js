const API_URL = "/api/workouts";

export async function getWorkouts() {
  const response = await fetch(API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export async function getWorkoutById(id) {
  if (!id) throw new Error("Workout id is required");

  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
}

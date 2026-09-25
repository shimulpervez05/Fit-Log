const API_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Get all workouts
 */
export async function getWorkouts() {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

/**
 * Get a single workout by ID
 */
export async function getWorkoutById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
}
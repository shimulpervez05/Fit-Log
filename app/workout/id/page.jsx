import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import WorkoutDetails from "@/components/WorkoutDetails";
import { getWorkoutById } from "@/lib/api";

export default async function WorkoutPage({ params }) {
  const { id } = await params;

  let workout = null;

  try {
    workout = await getWorkoutById(id);
  } catch (error) {
    console.error("Failed to load workout:", error);
  }

  /*
   * The API may return:
   * - workout object directly
   * - { data: workout }
   * - { workout: workout }
   */
  const workoutData =
    workout?.data ||
    workout?.workout ||
    workout;

  if (!workoutData || typeof workoutData !== "object") {
    notFound();
  }

  return (
    <>
      <Navbar />

      <WorkoutDetails workout={workoutData} />
    </>
  );
}
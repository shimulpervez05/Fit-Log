import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WorkoutDetails from "@/components/WorkoutDetails";
import { getWorkoutById } from "@/lib/api";

export default async function WorkoutPage({ params }) {
  const { id } = await params;

  try {
    const response = await getWorkoutById(id);
    const workout = response?.data ?? response?.workout ?? response;

    if (!workout || typeof workout !== "object") {
      notFound();
    }

    return (
      <>
        <Navbar />
        <WorkoutDetails workout={workout} />
      </>
    );
  } catch {
    notFound();
  }
}

import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WorkoutDetails from "@/components/WorkoutDetails";
import { getWorkoutById } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WorkoutPage({ params }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  try {
    const data = await getWorkoutById(id);
    const workout = data?.data || data?.workout || data;

    if (!workout || typeof workout !== "object") {
      notFound();
    }

    return (
      <>
        <Navbar />
        <WorkoutDetails workout={workout} />
      </>
    );
  } catch (error) {
    console.error("Failed to load workout:", error);
    notFound();
  }
}

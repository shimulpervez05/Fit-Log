import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WorkoutDetails from "@/components/WorkoutDetails";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const dynamic = "force-dynamic";

export default async function WorkoutPage({ params }) {
  const { id } = await params;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      notFound();
    }

    const data = await response.json();

    const workout = data?.data || data?.workout || data;

    if (!workout || typeof workout !== "object") {
      notFound();
    }

     return(
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
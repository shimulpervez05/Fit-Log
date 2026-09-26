import { NextResponse } from "next/server";
import { getFallbackWorkout } from "@/lib/fallback-workouts";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(_request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Workout id is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error(`Upstream status ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const fallback = getFallbackWorkout(id);
    if (fallback) {
      console.error(`Workout ${id} unavailable upstream; using local fallback.`);
      return NextResponse.json(fallback, {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-FitLog-Data-Source": "fallback",
        },
      });
    }

    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }
}

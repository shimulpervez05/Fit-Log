import { NextResponse } from "next/server";
import { fallbackWorkouts } from "@/lib/fallback-workouts";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error(`Upstream status ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Workout API unavailable; using local fallback:", error);
    return NextResponse.json(fallbackWorkouts, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-FitLog-Data-Source": "fallback",
      },
    });
  }
}

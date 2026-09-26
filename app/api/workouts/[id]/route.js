import { NextResponse } from "next/server";

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
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Upstream workout API failed",
          status: response.status,
          details: text.slice(0, 500),
        },
        { status: response.status === 404 ? 404 : 502 }
      );
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Workout API returned invalid JSON" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Workout detail proxy error:", error);

    return NextResponse.json(
      { error: "Could not connect to workout API" },
      { status: 502 }
    );
  }
}

// "use server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const showId = id;
  const API_URL = process.env.API_URL;
  try {
    const response = await fetch(
      `${API_URL}/api/shows/${showId}?populate=*&pagination[page]=1&pagination[pageSize]=1000`
    );
    const shows = await response.json();
    return NextResponse.json(shows);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({
      error: "Failed to fetch genres",
    });
  }
}

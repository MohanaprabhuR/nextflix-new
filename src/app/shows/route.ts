// "use server";
import { NextResponse } from "next/server";

export async function GET() {
  const API_URL = process.env.API_URL;
  try {
    const response = await fetch(`${API_URL}/api/shows?populate=*`);
    const shows = await response.json();
    return NextResponse.json(shows);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({
      error: "Failed to fetch genres",
    });
  }
}

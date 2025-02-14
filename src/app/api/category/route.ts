import { NextResponse } from "next/server";

export async function GET() {
  const API_URL = process.env.API_URL;
  try {
    const response = await fetch(`${API_URL}/api/genres?populate=*`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({
      error: "Failed to fetch genres",
    });
  }
}

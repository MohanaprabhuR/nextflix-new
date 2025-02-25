import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const API_URL = process.env.API_URL;
  const id = (await params).id;

  try {
    const response = await fetch(`${API_URL}/api/genres/${id}?populate=*`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}
